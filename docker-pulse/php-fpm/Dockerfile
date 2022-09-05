FROM php:8.1.2-fpm

COPY wait-for-it.sh /usr/bin/wait-for-it

RUN chmod +x /usr/bin/wait-for-it

RUN apt-get update && apt-get install -y libsqlite3-dev libcurl4-openssl-dev libxslt-dev zlib1g-dev libpng-dev libonig-dev git
RUN docker-php-ext-install mysqli xsl gd curl mbstring pdo_mysql

# RUN mkdir -p /usr/src/php/ext/redis; \
# 	curl -fsSL https://pecl.php.net/get/redis --ipv4 | tar xvz -C "/usr/src/php/ext/redis" --strip 1; \
# 	docker-php-ext-install redis;

###xdebug###
#RUN apk add --no-cache $PHPIZE_DEPS \
#    && pecl install xdebug \
#    && docker-php-ext-enable xdebug \
#    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
#    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini\
#    && echo "xdebug.mode=develop,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini\
#    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD composer install ; wait-for-it database:3306 ;  php-fpm 

EXPOSE 9000
