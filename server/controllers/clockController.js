import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const calculateHours = (from, to) => {
    const [fromHours, fromMinutes, fromSeconds] = from.split(':').map(Number);
    const [toHours, toMinutes, toSeconds] = to.split(':').map(Number);

    const fromDate = new Date();
    fromDate.setHours(fromHours, fromMinutes, fromSeconds);

    const toDate = new Date();
    toDate.setHours(toHours, toMinutes, toSeconds);

    const diffMs = toDate - fromDate;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}.${minutes.toString().padStart(2, '0')}`;
};

const clockManually = asyncHandler(async (req, res) => {
    const { from, to, date } = req.body;
    const user = req.user;
    
    try {
        const hoursWorked = calculateHours(from, to);

        const newClockEntry = {
            from,
            to,
            date,
            hours: hoursWorked,
        };

        user.hours.push(newClockEntry);

        await user.save();
        return res.status(200).json({ message: 'Clocked in manually', clockEntry: newClockEntry });
    } catch (error) {
        res.status(400).json({ message: 'Error clocking in manually', error: error.message });
    }
});

const clockIn = asyncHandler(async(req, res) => {
    const user = req.user;

    const currentDate = new Date();
    const from = formatTime(currentDate);
    const date = currentDate.toISOString().split('T')[0];

    const activeClockIn = user.hours.some(entry => entry.date === date && !entry.to);

    if (!activeClockIn) {
        const newClockEntry = {
            from,
            date,
        };

        user.hours.push(newClockEntry);

        await user.save();

        return res.status(200).json({ message: 'Clock-in successful', clockEntry: newClockEntry });
    } else {
        res.status(400);
        throw new Error("You're already clocked in");
    }
})

const clockOut = asyncHandler(async(req, res) => {
    const user = req.user;

    const currentDate = new Date();
    const to = formatTime(currentDate);

    const lastClockEntry = user.hours[user.hours.length - 1];
    if (!lastClockEntry || lastClockEntry.to) {
        res.status(400);
        throw new Error('No active clock in found')
    } else {
        const from = lastClockEntry.from;
        
        const hoursWorked = calculateHours(from, to);
    
        lastClockEntry.to = to;
        lastClockEntry.hours = hoursWorked;
    
        await user.save();
    
        return res.status(200).json({ message: 'Clock-out successful', clockEntry: lastClockEntry });
}
})

const getClockEntry = asyncHandler(async (req, res) => {
    try {
        const entryId = req.params.entryId;
        const userId = req.params.userId;
        
        const user = await User.findById(userId);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        const entry = user.hours.id(entryId);

        if (!entry) {
            res.status(404);
            throw new Error('Clock entry not found');
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(403)
        throw new Error('Couldnt find entry');
    }
})

const getClockHistory = async (req, res) => {
    const user = req.user;
    try {
        const {limit} = req.query
        const hours = user.hours;
        const limitedHours = limit ? hours.slice(-parseInt(limit)) : hours;
        res.status(200).json(limitedHours);
    } catch (error) {
        res.status(403).json(error);
    }
}

export default {clockIn, clockOut, clockManually, getClockHistory, getClockEntry}