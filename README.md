# ProjectManagement
  #Để có thể cài đặt project, bạn cần có: 
  
	# nodejs
	# npm
	# xampp
	# composer-Setup

# Khởi động server
   #Clone project về và cho vào thư mục xampp/htdocs
   
   #Bật XAPP controller panel lên
   
   #Start apache và sql lên (Lưu ý: Tắt sql server cũ ở máy đi nếu có)
   
   #Truy cập: localhost/phpmyadmin và tạo database "project_manager"
   
   #Cài đặt Composer-Setup và chọn đường dẫn chọn đường dẫn đến xampp/php/php (Application)
   
   #Sau khi finish xong, tại thư mục cnwtt, trong giao diện dòng lệnh cmd, thực hiện các lệnh sau:
   
        # composer install
        # copy .env.example .env

   #Mở file .env trong project rồi chỉnh sửa: 
   
        # DB_CONNECTION=mysql
        # DB_HOST=127.0.0.1
        # DB_PORT=3306
        # DB_DATABASE=project_manager
        # DB_USERNAME=root
        # DB_PASSWORD=

   #Tiếp tục thực hiện các lệnh trên cmd:

        # php artisan key:generate 
        # php artisan migrate
        # php artisan db:seed
	# php artisan passport:install
        # php artisan serve 
	
# Khởi động project phía client:
  #Tại thư mục React của project, thực hiện lệnh:

        # npm install
	
  #Sau khi hoàn tất quá trình tải dependency, tiếp tục thực hiện lệnh sau và trải nghiệm project này:
  
  	#npm run start



