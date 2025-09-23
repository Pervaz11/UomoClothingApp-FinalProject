import Location from "../models/LocationModel.js";

// Yeni dükan əlavə et
export async function createLocation(req, res) {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Bütün dükanları gətir
export async function getLocations(req, res) {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Tək dükanı gətir (ID ilə)
export async function getLocationById(req, res) {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: "Tapılmadı" });
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Dükanı yenilə
export async function updateLocation(req, res) {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!location) return res.status(404).json({ message: "Tapılmadı" });
        res.json(location);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Dükanı sil
export async function deleteLocation(req, res) {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) return res.status(404).json({ message: "Tapılmadı" });
        res.json({ message: "Uğurla silindi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
