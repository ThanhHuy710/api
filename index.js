const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API Lấy danh sách xe (Vẫn giữ nguyên vì đang chạy tốt)
// 1. API Lấy danh sách xe (Sửa lại phần GIA_BAN)
app.get('/api/v/de1', (req, res) => {
    const ds_xe = [
        { 
            "BIEN_SO": "29A-12345", 
            "TEN_XE": "Toyota Vios", 
            "GIA_BAN": 350000000 // ĐỂ SỐ THUẦN TÚY, KHÔNG DẤU CHẤM, KHÔNG NGOẶC KÉP
        },
        { 
            "BIEN_SO": "30H-99999", 
            "TEN_XE": "Mercedes C200", 
            "GIA_BAN": 1200000000 
        },
        { 
            "BIEN_SO": "51G-55555", 
            "TEN_XE": "Honda City", 
            "GIA_BAN": 450000000 
        }
    ];
    res.json({ "DS_XE_CU": ds_xe });
});
app.all('/api/v/de2', (req, res) => {
    const ds_xe_moi = [
        { "BIEN_SO": "60A-88888", "TEN_XE": "Ford Ranger Wildtrak", "GIA_BAN": 950000000 },
        { "BIEN_SO": "72B-12345", "TEN_XE": "Hyundai SantaFe", "GIA_BAN": 1150000000 },
        { "BIEN_SO": "65C-99999", "TEN_XE": "Kia Carnival", "GIA_BAN": 1450000000 },
        { "BIEN_SO": "51D-00001", "TEN_XE": "VinFast VF9", "GIA_BAN": 1900000000 }
    ];
    res.json({ "DS_XE_CU": ds_xe_moi });
});
// 2. API Đăng nhập linh hoạt (Sửa lỗi 500)
app.all('/api/v/Login_de1', (req, res) => {
    try {
        // Lấy dữ liệu an toàn từ POST (body) hoặc GET (query)
        // Dùng ?. để nếu dữ liệu null cũng không làm sập server
        const username = req.body?.username || req.query?.username;
        const password = req.body?.password || req.query?.password;

        if (username === "admin" && password === "123") {
            res.json({ "SUCCESS": "TRUE" });
        } else {
            res.json({ "SUCCESS": "FALSE" });
        }
    } catch (err) {
        console.error("Lỗi login:", err);
        res.status(500).json({ "SUCCESS": "ERROR", "MESSAGE": "Server gặp sự cố" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server live tại port ${PORT}`);
});