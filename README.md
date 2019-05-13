# ProjectManagement

# Cài đặt frontend
   #Clone project về máy
   #Cài đặt nodejs
   #Mở project bằng visual studio code 
   #Gõ npm i để install file package.js sử dụng trong frontend
   #Gõ npm start để chạy frontend trên localhost:3000
# Cài đặt backend
   #Tải xampp
   #https://www.apachefriends.org/download.html
   #Clone thư mục cnwtt về và cho vào thư mục xampp/htdocs

   #Search: Xampp rồi bật XAPP controller panel lên

   #Start apache và sql lên (Lưu ý: Tắt sql server cũ ở máy đi nếu có)

   #truy cập: localhost/phpmyadmin tạo database "project_manager"

   #Truy cập  https://getcomposer.org/download/ để tải  Composer-Setup.exe
   #Tải xong chạy và cài đặt bình thường. Đến lúc nó bắt chọn đường dẫn để cài tiếp thì chọn đường dẫn đến xampp/php/php (Application)
   #Ấn next để cài tiếp.
   #Cài khi finish cài xong:
	# mở cmd
	# Đóng tất cả các cửa sổ window lại ( Bao gồm cả cmd)
	# Bật cmd lên  phát nữa rồi tắt đi
	# Logout ra khỏi máy tính rồi Login lại
	# Bật cmd lên để bắt đầu thao tác lệnh
 
   #Vào cmd:
   #Chuyển đường dẫn đến thư mục xampp\htdocs\cnwtt tùy vào đường dẫn của máy mọi người
 gõ:

        # composer install
        # copy .env.example .env



   #Vào file .env trong project rồi chỉnh sửa 
        # DB_CONNECTION=mysql
        # DB_HOST=127.0.0.1
        # DB_PORT=3306
        # DB_DATABASE=project_manager
        # DB_USERNAME=root
        # DB_PASSWORD=


   #Mở cmd lên gõ tiếp:

        # php artisan key:generate 
        # php artisan migrate
        # php artisan db:seed
	# php artisan passport:install
        # php artisan serve 

  #Lúc này cổng 8000 trên localhost đang mở ta gọi api trên cổng này

Ví dụ: localhost:8000/api/login

