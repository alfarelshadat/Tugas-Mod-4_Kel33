import { ReportModel } from '../models/reportModel.js';
export const ReportController = {
async getTopBooks(req, res) {
try {
const data = await ReportModel.getTopBooks();
res.json({
message: "Top 2 buku paling sering dipinjam",
data
});
} catch (err) {
res.status(500).json({ error: err.message });
}
},
async getStats(req, res) {
try {
const data = await ReportModel.getStats();
res.json({
message: "Statistik perpustakaan",
data
});
} catch (err) {
res.status(500).json({ error: err.message });
}
}
};
