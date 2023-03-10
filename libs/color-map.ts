const color: Map<string, string> = new Map([
    ["ผักบุ้ง", "#aefd89"],
    ["เนื้อปลากราย", "#EE9DA5"],
    ["พริกแกงเผ็ด", "#EE9DA5"],
    ["ไข่ไก่", "#EE9DA5"],
    ["ใบมะกรูด", "#aefd89"],
    ["ถั่วฝักยาว", "#aefd89"],
    ["น้ำตาลทราย", "#9fc5e8"],
    ["น้ำปลา", "#9fc5e8"],
    ["น้ำมันพืช", "#ffe599"],
    ["น้ำจิ้มไก่", "#9fc5e8"],
    ["ปลา", "#EE9DA5"],
    ["เกลือป่น", "#9fc5e8"],
    ["แป้งมัน", "#d98f43"],
    ["ตะไคร้", "#aefd89"],
    ["ใบเตย", "#aefd89"],
    ["ผักแกล้ม", "#aefd89"],
    ["ไก่", "#EE9DA5"],
    ["กะทิ", "#ffe599"],
    ["มะเขือเปราะ", "#aefd89"],
    ["มะเขือพวง", "#aefd89"],
    ["พริกชี้ฟ้า", "#aefd89"],
    ["ใบโหระพา", "#aefd89"],
    ["น้ำปี๊บ", "#9fc5e8"],
    ["หอมแดง", "#aefd89"],
    ["เกลือ", "#9fc5e8"],
    ["กระเทียม", "#aefd89"],
    ["รากผักชี", "#aefd89"],
    ["พริกไทย", "#aefd89"],
    ["กะปิ", "#EE9DA5"],
    ["พริกขี้หนู", "#aefd89"],
    ["ข่า", "#aefd89"],
    ["ผิวมะกรูด", "#aefd89"],
    ["ลูกผักชี", "#aefd89"],
    ["ยี่หร่า", "#aefd89"],
    ["ลูกจันทร์", "#aefd89"],
    ["ขิง", "#aefd89"],
    ["น้ำตาลกรวด", "#9fc5e8"],
    ["ข้าว", "#d98f43"],
    ["ซีอิ๊วขาว", "#9fc5e8"],
    ["แตงกวา", "#aefd89"],
    ["ผักชี", "#aefd89"],
    ["เต้าเจี้ยว", "#EE9DA5"],
    ["ซีอิ๊วหวาน", "#9fc5e8"],
    ["มะนาว", "#aefd89"],
    ["น้ำ", "#9fc5e8"],
    ["ฟัก", "#aefd89"],
    ["น้ำต้มไก่", "#9fc5e8"],
    ["หมูสันนอก", "#EE9DA5"],
    ["เนยสดจืด", "#ffe599"],
    ["ผงปรุงรสหมู", "#9fc5e8"],
    ["ซีอิ๊วขาวเห็ดหอม", "#9fc5e8"],
    ["ผงกะหรี่", "#9fc5e8"],
    ["หางกะทิ", "#ffe599"],
    ["สีผสมอาหาร สีเหลืองไข่", "#9fc5e8"],
    ["พริกแกงพะแนง", "#9fc5e8"],
    ["พริกแกงมัสมั่น", "#9fc5e8"],
    ["น้ำตาลปิ๊บ", "#9fc5e8"],
    ["ถั่วลิสงคั่ว", "#EE9DA5"],
    ["น้ำมะขามเปียก", "#9fc5e8"],
    ["หัวกะทิ", "#ffe599"],
    ["น้ำส้มสายชู", "#9fc5e8"],
    ["หอมแดงซอย", "#aefd89"],
    ["พริกชี้ฟ้าแดง", "#aefd89"],
    ["หมูสับ", "#EE9DA5"],
    ["น้ำเปล่า", "#9fc5e8"],
    ["ต้นหอม", "#aefd89"],
    ["ใบสะระแหน่", "#aefd89"],
    ["ผักชีฝรั่ง", "#aefd89"],
    ["พริกป่น", "#aefd89"],
    ["น้ำมะนาว", "#aefd89"],
    ["ข้าวคั่ว", "#d98f43"],
    ["น้ำตาล", "#9fc5e8"],
    ["พริกแห้ง", "#aefd89"],
    ["กระชาย", "#aefd89"],
    ["ลูกชิ้นปลา", "#EE9DA5"],
    ["ซอสหอยนางรม", "#9fc5e8"],
    ["ซอสปรุงอาหาร", "#9fc5e8"],
    ["มันหมูแข็ง", "#ffe599"],
    ["กุ้งใหญ่", "#EE9DA5"],
    ["วุ้นเส้น", "#d98f43"],
    ["เม็ดผักชี", "#aefd89"],
    ["พริกไทยขาวเม็ด", "#aefd89"],
    ["น้ำมันงา", "#ffe599"],
    ["ข้าวหอมมะลิ", "#d98f43"],
    ["โยเกิร์ตรสธรรมชาติ", "#EE9DA5"],
    ["นมข้นจืด", "#EE9DA5"],
    ["ใบกระวาน", "#aefd89"],
    ["กานพลูป่น", "#aefd89"],
    ["ลูกผักชีป่น", "#aefd89"],
    ["ยี่หร่าป่น", "#aefd89"],
    ["อบเชยป่น", "#aefd89"],
    ["ขมิ้นผง", "#aefd89"],
    ["เนยสดรสเค็ม", "#ffe599"],
    ["หอมเจียว", "#aefd89"],
    ["กระดูกเล้ง", "#EE9DA5"],
    ["กระดูกคาตั๊ง", "#EE9DA5"],
    ["พริกไทยเม็ด", "#aefd89"],
    ["กระเทียมไทย", "#aefd89"],
    ["หัวไชเท้า", "#aefd89"],
    ["ซุปคนอร์", "#9fc5e8"],
    ["กุ้งขาวสับ", "#EE9DA5"],
    ["หมูบดติดมัน", "#EE9DA5"],
    ["ซอสปรุงรสฝาเขียว", "#9fc5e8"],
    ["ต้นหอมซอย", "#aefd89"],
    ["หอยลาย", "#EE9DA5"],
    ["กระเทียมสับ", "#aefd89"],
    ["พริกเผา", "#9fc5e8"],
    ["ซีอิ้วขาว", "#9fc5e8"],
    ["น้ำมันหอย", "#ffe599"],
    ["เนื้อสันคอหมู", "#EE9DA5"],
    ["น้ำตาลปี๊บ", "#9fc5e8"],
    ["น้ำเปล่าต้มสุก", "#9fc5e8"],
    ["น้ำเชื่อม", "#9fc5e8"],
    ["น้ำมะนาวสด", "#aefd89"],
    ["พริกหนูสวนสีเขียว", "#aefd89"],
    ["กุ้งแม่น้ำ", "#EE9DA5"],
    ["ไข่", "#EE9DA5"],
    ["หอม", "#aefd89"],
    ["น้ำมัน", "#ffe599"],
    ["หอยแครง", "#EE9DA5"],
    ["เป็ด", "#EE9DA5"],
    ["สีผสมอาหาร สีแดงส้ม", "#9fc5e8"],
    ["น้ำผึ้ง", "#9fc5e8"],
    ["น้ำสะอาด", "#9fc5e8"],
    ["เห็ดหอม", "#aefd89"],
    ["มะระ", "#aefd89"],
    ["ผงปรุงรส", "#9fc5e8"],
    ["พริกไทยดำ", "#aefd89"],
    ["ซอสปรุงรส", "#9fc5e8"],
    ["หมูบด", "#EE9DA5"],
    ["ข้าเหนียว", "#d98f43"],
    ["มะม่วง", "#f6b26b"],
    ["ยอดมะระ", "#aefd89"],
    ["พริกขี้หนูแดง", "#aefd89"],
    ["น้ำมันถั่วเหลือง", "#ffe599"],
    ["เนื้อหมู", "#EE9DA5"],
    ["ผงพะโล้", "#9fc5e8"],
    ["งาคั่ว", "#aefd89"],
    ["ซีอิ้วดำ", "#9fc5e8"],
    ["สีผสมอาหาร สีแดง", "#9fc5e8"],
    ["พริกชี้ฟ้าเขียว", "#aefd89"],
    ["พริกเหลือง", "#aefd89"],
    ["ซอสมะเขือเทศ", "#9fc5e8"],
    ["น้ำสต๊อกไก่/หมู", "#9fc5e8"],
    ["พริกแดง", "#aefd89"],
    ["ผักบุ้งจีน", "#aefd89"],
    ["คอหมู", "#EE9DA5"],
    ["ใบกะเพรา", "#aefd89"],
    ["พริกแดงจินดา", "#aefd89"],
    ["พริกแห้งแดงจินดา", "#aefd89"],
    ["ซอสหอย", "#9fc5e8"],
    ["ซีอิ้วดำหวาน", "#9fc5e8"],
    ["ข้าวสารหอมมะลิ", "#d98f43"],
    ["ข้าวสารข้าวเหนียว", "#d98f43"],
    ["ซุปก้อนรสหมู", "#9fc5e8"],
    ["หมูเด้ง", "#EE9DA5"],
    ["ไข่ลวก", "#EE9DA5"],
    ["ขิงซอย", "#aefd89"],
    ["พริกไทยป่น", "#aefd89"],
    ["กระเทียมเจียว", "#aefd89"],
    ["ซอสแม๊กกี้", "#9fc5e8"],
    ["เส้นมะละกอสับ", "#aefd89"],
    ["มะเขือเทศ", "#aefd89"],
    ["พริกสด", "#aefd89"],
    ["มะกอก", "#aefd89"],
    ["ผงชูรส", "#9fc5e8"],
    ["ขาหมู", "#EE9DA5"],
    ["อบเชย", "#aefd89"],
    ["โป๊ยกั้ก", "#aefd89"],
    ["ข่าแก่", "#aefd89"],
    ["กระเทียมจีน", "#aefd89"],
    ["ผักกาดดอง", "#aefd89"],
    ["ผักคะน้า", "#aefd89"],
    ["หมูสับบด", "#EE9DA5"],
    ["ซอสถั่วเหลือง", "#9fc5e8"],
    ["ผักกาดขาว", "#aefd89"],
    ["สาหร่าย", "#aefd89"],
    ["คนอร์รสหมู", "#9fc5e8"],
    ["กุ้งแห้ง", "#EE9DA5"],
    ["กุนเชียง", "#EE9DA5"],
    ["พริกทอด", "#aefd89"],
    ["หมู", "#EE9DA5"],
    ["ซอสหอยนางลม", "#9fc5e8"],
    ["หมูสามชั้น", "#EE9DA5"],
    ["โป๊ยกั๊ก", "#aefd89"],
    ["ลูกชิ้นหมู หรือ ลูกชิ้นเนื้อวัว", "#EE9DA5"],
    ["เนื้อหมูลวก หรือเนื้อวัวลวก", "#EE9DA5"],
    ["ตับหมูลวก", "#EE9DA5"],
    ["กากหมู", "#EE9DA5"],
    ["พริกน้ำส้ม", "#9fc5e8"],
    ["เส้นเล็ก", "#d98f43"],
    ["ถั่วงอก", "#aefd89"],
    ["ผักบุ้ง", "#aefd89"],
    ["พริกหอม", "#aefd89"],
    ["กะทิสด", "#ffe599"],
    ["เลือดสด", "#EE9DA5"],
    ["เหล้าเซี่ยงชุน", "#9fc5e8"],
    ["น้ำกระเทียมดอง", "#9fc5e8"],
    ["กระเทียมบด", "#aefd89"],
    ["เต้าหู้ยี้บด", "#EE9DA5"],
    ["เต้าเจี๊ยวบด", "#EE9DA5"],
    ["กระดูกหมู", "#EE9DA5"],
    ["น้ำจิ้มสุกี้", "#9fc5e8"],
    ["หมูหมัก", "#EE9DA5"],
    ["คึ่นช่าย", "#aefd89"],
    ["หอมใหญ่", "#aefd89"],
    ["ปลาหมึกแห้งย่างไฟ", "#EE9DA5"],
    ["เต้าหู้ยี้", "#EE9DA5"],
    ["อสมะเขือเทศ", "#9fc5e8"],
    ["ซอสพริก", "#9fc5e8"],
    ["พริกชี้ฟ้าสีแดง", "#aefd89"],
    ["เส้นก๋วยเตี๋ยว", "#d98f43"],
    ["ผักบุ้งไทย", "#aefd89"],
    ["เลือดหมู", "#EE9DA5"],
    ["ปลาหมึกกรอบ", "#EE9DA5"],
    ["เห็ดหูหนูขาว", "#aefd89"],
    ["เต้าหู้ทอด", "#EE9DA5"],
    ["เกี๊ยวทอด", "#EE9DA5"],
    ["น้ำมันปาล์ม", "#ffe599"],
    ["เส้นใหญ่", "#d98f43"],
    ["ซีอิ๊วดำ", "#9fc5e8"],
    ["กระเทียมซอย", "#aefd89"],
    ["เห็ดฟาง", "#aefd89"],
    ["พริก", "#aefd89"],
    ["ผักคอส", "#aefd89"],
    ["ผักกาด", "#aefd89"],
    ["เบบี้ร็อคเก็ต", "#aefd89"],
    ["อกไก่", "#EE9DA5"],
    ["น้ำสลัด", "#9fc5e8"],
    ["แป้งข้าวเหนียว", "#d98f43"],
    ["แป้งข้าวเจ้า", "#d98f43"],
    ["แป้งอเนกประสงค์", "#d98f43"],
    ["แป้งท้าว", "#d98f43"],
    ["หอยแมลงภู่", "#EE9DA5"],
    ["ปลาเค็ม", "#EE9DA5"],
    ["สะโพกหมู", "#EE9DA5"],
    ["พริกไทยอ่อน", "#aefd89"],
    ["พริกแกงคั่วกลิ้ง", "#9fc5e8"],
    ["ปลาหมึกกระดอง", "#EE9DA5"],
    ["ผงขมิ้น", "#aefd89"],
    ["น้ำปูนใส", "#9fc5e8"],
    ["พริกแดงจินดาซอย", "#aefd89"],
    ["เส้นกวยจั๊บ", "#d98f43"],
    ["ตับหมู", "#EE9DA5"],
    ["หมูกรอบ", "#EE9DA5"],
    ["ไข่ไก่ต้ม", "#EE9DA5"],
    ["น้ำสต๊อก", "#9fc5e8"],
    ["สะโพกไก่", "#EE9DA5"],
    ["น้ำตาลปี๊ป", "#9fc5e8"],
    ["คนอร์ผงรสหมู", "#9fc5e8"],
    ["เนื้อไก่", "#EE9DA5"],
    ["กระเทียมป่น", "#aefd89"],
    ["พริกป่นเกาหลี", "#aefd89"],
    ["แป้งทอดกรอบ", "#d98f43"],
    ["แป้งสาลี", "#d98f43"],
    ["กุ้ง", "#EE9DA5"],
    ["ตระไคร้", "#aefd89"],
    ["ใบมะกูด", "#aefd89"],
    ["พริกจินดา", "#aefd89"],
    ["น้ำพริกเผา", "#9fc5e8"],
    ["เห็ด", "#aefd89"],
    ["น้ำพริกเผาและน้ำมันพริกเผา", "#aefd89"],
    ["ปูเนื้อ", "#EE9DA5"],
    ["หอมหัวใหญ่", "#aefd89"],
    ["คึ่นฉ่าย", "#aefd89"],
    ["บร็อคโคลี่", "#aefd89"],
    ["ข้าวโพดอ่อน", "#aefd89"],
    ["แครอท", "#aefd89"],
    ["ซอสกลิ่นหอยนางรม", "#9fc5e8"],
    ["น้ำสต็อก", "#9fc5e8"],
    ["ลูกกระวาน", "#aefd89"],
    ["มันฝรั่ง", "#aefd89"],
    ["ใบหยี่หร่า", "#aefd89"],
    ["เห็ดหอมสด", "#aefd89"],
    ["เส้นจันท์", "#d98f43"],
    ["กุ้งสด", "#EE9DA5"],
    ["เต้าหู้แข็ง", "#EE9DA5"],
    ["ไชโป๊วเค็ม", "#aefd89"],
    ["ใบกุยช่าย", "#aefd89"],
    ["เห็ดหูหนู", "#aefd89"],
    ["กุ้งขาว", "#EE9DA5"]
])

export { color }