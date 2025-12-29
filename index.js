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
// --- ĐỀ 3: CHỦ ĐỀ CẦU THỦ (Cấu trúc mới) ---
app.all('/api/v/de2', (req, res) => {
    const ds_cau_thu = [
        { 
            "MA_SO": "CT001", 
            "HO_TEN": "Lionel Messi", 
            "CAU_LAC_BO": "Inter Miami", 
            "SO_AO": 10,
            "LUONG_TUAN": 1200000.50 // Kiểu số thực
        },
        { 
            "MA_SO": "CT002", 
            "HO_TEN": "Cristiano Ronaldo", 
            "CAU_LAC_BO": "Al Nassr", 
            "SO_AO": 7,
            "LUONG_TUAN": 3400000.75
        },
        { 
            "MA_SO": "CT003", 
            "HO_TEN": "Kylian Mbappé", 
            "CAU_LAC_BO": "Real Madrid", 
            "SO_AO": 9,
            "LUONG_TUAN": 1500000.00
        }
    ];
    // Key bao ngoài là "DANH_SACH_CAU_THU"
    res.json({ "DANH_SACH_CAU_THU": ds_cau_thu });
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