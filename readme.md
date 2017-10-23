# App admin

##install
```
npm i 
```

##Prod build:
```
npm run build 
```

##Develop:
```
npm start
```

##Notes
Used env variables:  
*   **API_PUBLIC_URL**  
*   **API_ADMIN_URL**  
*   **NODE_ENV** (development/build)  
*   **PUBLIC_PATH** (from project root folder)  
*   **WEB_PORT** (for dev only, not use on **prod**)  
*   **GOOGLE_API_KEY** 123  
  
## Directory Layout

```
bin/                    --> all project configurations
  build.js              --> production configuration
  index.js              --> developemnt configuration
  server.js             --> server configuration
  webpack.config.js     --> webpack configuration
common/                 --> common app elements
  angular/              --> common angular elements
  templates/            --> common pug templates
docker/                 --> docker configuration catalog  
frontend/               --> project source code 
  app/                  --> project main pages
    guest/              --> unauthorized pages
    main/               --> authorized pages
  components/           --> components  
  config/               --> config for angular app
  directives/           --> directives    
  factories/            --> factories    
  helpers/              --> helpers
  providers/            --> providers
  services/             --> services
  styles/               --> styles
  index.js              --> include for all modules
      
```
