# Co-Working Procedure
## Step 1: Set-up environment
 - [Download and Install NodeJs](https://nodejs.org/en/) Current
 - Clone from Github 
```
git clone https://github.com/NHIMCOII/Finance_Management_WebApp.git
```
 - Installing npm
```
npm install
```
 - Initialize npm
```
 npm init
```
 - Go into package.json -> scroll down to "scripts" -> add "start": "nodemon app.js" (remember to add ',')
 - Installing Nodemon
```
npm install nodemon --save-dev
```
 - Installing Express 
```
npm install --save express 
```
 - Installing Packages
```
npm install --save body-parser
npm install --save ejs
npm install --save express-session
npm install --save mssql
npm install --save msnodesqlv8
npm install --save connect-mssql-v2
npm install --save bcryptjs
npm install --save csurf
npm install --save connect-flash
npm install --save express-validator
```
 - Create database tables (in .utils/database.sql)

 - Configuration Database (in ./utils/dbconfig.js)
    Determine the dynamic port in your PC
    Change the attribute "port" in db.config.js to the port that your server is listening on

 - Set up sessions-database: 
     In SQL Server Management Studio, run the query in ./utils/database.sql
     
 - Set up database configuarion: 
   In ./utils/dbconfig.js, indentify your port that the sql server is listening on. Learn more: https://www.mssqltips.com/sqlservertip/2495/identify-sql-server-tcp-ip-port-being-used/.
   Change the attribute "port" to the port you have identified.

## Step 2: Workflow
 ### GIT
```
git checkout [your_branch]
git pull origin master
git add .
git commit -m 'commit messsage'
git push origin [your_branch]
```
 - Delete your old branch after finish your work then create new branch to start working on next feature
```
    git branch -d [old branch]
    git switch -c "new branch"
    git push -u origin [new branch]
```
 - Create Pull request
 
 ### For /Views
 - Read any .ejs file and notice path changes in any tag use outer resources  (must change)
 - When done editing a .html file, change to .ejs file
 
# FMS Free Bootstrap 4 Admin Template

FMS Free Dashboard Template made using Bootstrap 4 framework, It is a free lite version of [FMS Pro](https://codedthemes.com/item/datta-able-premium/) Dashboard Template that makes you fulfill your Dashboard needs.

![FMS Free Admin Template Preview Image](http://html.codedthemes.com/datta-able/bootstrap/adv-banner/git-datta-free.png)

FMS Admin Template comes with variety of components like Button, Badges, Tabs, Breadcrumb, Icons, Form elements, Table, Charts & Authentication pages.

The code structure is high flexible to use and modify. 

Its design adapt any screen size easily even if retina screens.

It is modern concept dashboard design with eye catchy colors. Wish you happy to use our product in your project.

## Free Version Preview & Download

Check out live preview of FMS lite version & download it.

#### Preview

 - [Demo](http://lite.codedthemes.com/datta-able/bootstrap)

#### Download

 - [Download from Github](https://github.com/codedthemes/datta-able-bootstrap-dashboard.git)
 - [Download from CodedThemes]( https://codedthemes.com/item/datta-able-bootstrap-lite/) & receive important notification instantly in your maiL.
 
 ## Premium Version Preview & Download

FMS Pro Admin Template is available to purchase. Visit its numerous demos and make your purchase decision.
#### Preview

 - [Demo](http://html.codedthemes.com/datta-able/bootstrap/default)

#### Download

 - [Purchase from CodedThemes](https://codedthemes.com/item/datta-able-premium)

## Table of contents

 * [Getting Started](#getting-started)
 * [Online Documentation](#online-documentation)
 * [Build With](#build-with)
 * [Directory-structure](#directory-structure)
 * [RoadMap](#roadmap)
 * [Author](#author)
 * [Contributing](#contributing)
 * [Issues?](#issues)
 * [License](#license)
 * [Other Dashboard Products](#other-dashboard-products)
 * [Social Profiles](#social-profiles)
 
## Getting Started

Clone from Github 
```
git clone https://github.com/codedthemes/datta-able-bootstrap-dashboard.git
```
*no other dependencies required to run the FMS Template*

## Online Documentation

FMS Lite version documentation cover in its Pro version documentation - check our [website.](http://html.codedthemes.com/datta-able/bootstrap/default/docs.html)

## Build With

 - [Bootstrap 4](https://getbootstrap.com/)
 - [SASS](https://sass-lang.com/) - SCSS file not included in lite version v1.0
 
## Directory Structure

```
Datta-able/
├── assets/
│   ├── css/
│   │   ├── style.css
│   ├── fonts/
│   │   ├── feather/css/feather.css
│   │   ├── fontawesome/css/fontawesome-all.min.css
│   │   ├── datta/datta-icon.css
│   ├── images/
│   │   ├── user/
│   │   │   ├── avatar-1.jpg
│   │   │   ├── avatar-2.jpg
│   │   │   ├── ...-More
│   │   ├── logo.png
│   │   ├── ...-More
│   ├── js/
│   │   ├── pages/
│   │   │   ├── chart-morris-custom.js
│   │   │   ├── google-maps.js
│   │   ├── vendor-all.min.js
│   │   ├── pcoded.min.js
│   ├── plugins/
│   │   ├── jquery/
│   │   │   ├── js/
│   │   │   │   ├── jquery.min.js
│   │   ├── bootstrap/
│   │   │   ├── css/
│   │   │   │   ├── bootstrap.min.css
│   │   │   ├── js/
│   │   │   │   ├── bootstrap.min.js
│   │   ├── ...-More
├── index.html
├── ...- More
```

## RoadMap

We are continuously working in FMS Project and going to make it a awesome dashboard template via your support. Give us the ideas, suggestion for include more components, pages, plugins. Few of future release pages are
 
#### Layouts 
 - Horizontal version
 - Sidebar Image version
 - Introduce Live Customizer (i.e. only for demo)

#### Pages
 - Pricing
 - Login/Register pages version 2
 - User profile
 - Maintenance Pages like 404, Error Pages, Coming Soon 

#### Basic & Advance Components
 - Alert, Cards, Progress, Modal
 - Datepicker, Notification, Slider

*All above pages already included in Pro version. We need your support to include those pages in lite version too.*

## Author

Design and code is completely written by CodedThemes's design and development team. We are happy to welcome the contributors work for our all repositories.

## Issues

Please generate Github issue if you found bug in any version. We are try to be responsive to resolve the issue.

## License

 - Design and Code is Copyright &copy; [CodedThemes](https://www.codedthemes.com)
 - Licensed cover under [MIT](https://github.com/codedthemes/datta-able-bootstrap-dashboard/blob/master/LICENSE)

## Other Dashboard Products

 - [Free Bootstrap 4 Admin Template](https://codedthemes.com/item/category/free-templates/free-bootstrap-admin-templates)
 - [Free React Dashboard Template](https://codedthemes.com/item/category/free-templates/free-react-admin-templates)
 - [Free Angular Dashboard Template](https://codedthemes.com/item/category/free-templates/free-angular-admin-templates)
 - [Premium Bootstrap & Angular Admin Template](https://codedthemes.com/item/category/templates/admin-templates/)
 
## Social Profiles
 - Dribbble [https://dribbble.com/codedthemes](https://dribbble.com/codedthemes)
 - Behance [https://www.behance.net/codedthemes](https://www.behance.net/codedthemes)
 - Facebook [https://www.facebook.com/codedthemes](https://www.facebook.com/codedthemes)
 - Twitter [https://twitter.com/codedthemes](https://twitter.com/codedthemes)
 - Instagram [https://www.instagram.com/codedthemes/](https://www.instagram.com/codedthemes/)
