# Recipe Back end
Recipes Express.js Server and MongoDB Backend hosted on Heroku https://radiant-sierra-26169.herokuapp.com/

## Purpose
This program exposes API routes to a front end app to do database operations. Its provides the data of the recipes.

## API routes
```
{
  GET /recipes : returns a collection of recipes sorted by creation date
  GET /recipes?searchTerm=keyword : returns a collection of recipes that match the keyword. 
                                    Criteria for match is: keyword found in name of recipe 
                                    and ingredient of recipe
 GET /recipes?sortType=key: returns a collection sorted by key. Sorts are done on name and creation date.
 POST /recipes: insert a new record of a recipe
 
 POST /saved-recipes : inserts a new record of recipe that the user wants to save as his or her favourites
 GET /saved-recipes: retrieves a collection of recipe the user has saved in favourites
}
```

## Packages used:
```
cors: version 2.8.5,
express: version 4.17.1,
mongoose: version 5.9.9
```

## How to use: 

`git clone`  
`npm install`  

`npm run start:dev`  
Starts the Express server on localhost. 

### ENV variables: 

* process.env.PORT
* process.env.FRONTEND_URL

## Future work: 
* Write the unit tests with supertest and mongodb memory server
* Even more complex database queries

### Front end repo  
https://github.com/teojincheng/recipe
