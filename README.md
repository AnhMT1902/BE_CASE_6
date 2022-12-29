# BE_CASE_6

# Run

npm i --save
npm run start:dev

# API localhost:8080

//company:

1. localhost: 8080/company/login  
   (đăng nhập dành cho doanh nghiệp, yêu cầu đăng nhập bằng email đã đăng ký, mật khẩu được hệ thống gửi đến mail của
   người đăng ký)

2. http://localhost: 8080/company/register  
   (đăng ký doanh nghiệp , yêu cầu bắt buộc có trường email, name, phoneNumber, address)

3. http://localhost: 8080/company/update/:companyId
   (update thông tin doanh nghiệp,phải đủ tất cả các trường mới cho đăng bài tuyển dụng)

4. http://localhost: 8080/

# user

1. localhost: 8080/company/login 