# yandex2mqtt (zigbee2mqtt version)
Приложение-мост из Яндекс УД в MQTT на Node.js 

Статья на Хабре об оригинальном репозитории https://habr.com/ru/post/465537/

**ВАЖНО!** В этом форке изменен формат описания mqtt-топиков и значений payload.
Также из сервиса убрано шифрование SSL, так как его проще включить на уровне веб-сервера (nginx, apache)

## Установка

Настраиваем репозиторий Node JS

```
curl -sL https://deb.nodesource.com/setup_10.x | bash -
```

Устанавливаем необходимые компоненты

```
apt-get install -y nodejs git make g++ gcc build-essential
```

Копируем файлы

```
git clone https://github.com/phplego/yandex2mqtt.git /mnt/data/root/yandex2mqtt
```

Задаём права.
```
chown -R root:root /mnt/data/root/yandex2mqtt
```

Заходим в директорию и запускаем установку

```
cd /mnt/data/root/yandex2mqtt
npm install
```

Запускаем приложение  (Перед запуском приложение нужно настроить, отредактировав конфиг-файл)

```
npm start
```

## Автозапуск

В папке  /etc/systemd/system/ создайте файл yandex2mqtt.service и впишите в него:

```
[Unit]
Description=yandex2mqtt
After=network.target

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/mnt/data/root/yandex2mqtt
StandardOutput=inherit
StandardError=inherit
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```


Для включения сервиса впишите в консоль:

```
systemctl enable yandex2mqtt.service
```

После этого можно управлять командами:

```
service yandex2mqtt start
service yandex2mqtt stop
service yandex2mqtt restart
```

Для открытия сервиса внешнему миру (и серверу яндекс), настройте nginx proxy на порт указанный в конфиге (по умолчанию 6666):
```
server {
    server_name  your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:6666;
    }

    listen 80;
}

```


## Настройка

Для работы моста необходим валидный ssl сертификат. Если нет своего домена и белого IP адреса можно воспользоваться Dynamic DNS  сервисами. (на пример noip.com). Для получения сертификата можно воспользоваться приложением certbot. 

Основные настройки моста прописываются в файл **config.js** или **config-local.js**. Настройкий устройств описываются в файле **config-devices.js**. Перед запуском обязательно отредактируйте настройки. 


1) MQTT: Прописываем параметры своего MQTT сервера.
2) clients: Укажите произвольные параметры клиента. (Будет нужно для настройки навыка в Яндексе)
3) users: Укажите параметры пользователей для доступа к мосту.
4) devices: Укажите необходимые девайсы и топики MQTT для управления. В конфиге уже вписанно несколько устройств для примера их конфигурации.

Чуть позже добавлю шаблоны устройств. 

Для лучшего понимания советую посмотреть документацию от Яндекса.

https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/main-objects-docpage/

https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/on_off-docpage/

## Создание навыка

* Заходим на https://dialogs.yandex.ru/developer/skills => Создать диалог => Умный дом
* Название: Любое
* Endpoint URL: https://вашдомен/provider
* Ставим галку "Не показывать в каталоге"
* Имя разработчика: Ваше имя
* Нажимаем "Добавить новую" связку
* Название: Любое
* Идентификатор  и секрет : берем из конфигурации yandex2mqtt в блоке "clients".
* URL авторизации: https://вашдомен/dialog/authorize
* URL для получения токена: https://вашдомен/oauth/token
* Сохраняем связку и выбираем её в навыке. Выбираем иконку, пишем описание, нажимаем "Сохранить". 
* Дальше жмём "На модерацию" и сразу "Опубликовать". Готово. 
* Навык появится в приложении Яндекс в разделе "Устройства" => умный дом. 
* Свяжите аккаунты и обновите список устройств. После этого устройства будут доступны для управления через Алису. 
