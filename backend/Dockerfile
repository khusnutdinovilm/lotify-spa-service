FROM php:8.2-cli

# Устанавливаем системные пакеты и расширения PHP
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev zip \
    && docker-php-ext-install pdo_mysql zip

# Устанавливаем Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Копируем код
COPY backend ./

RUN composer install

# Делаем storage и bootstrap/cache доступными для записи
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
