# ProductServiceApi
API Service for handling products

## The API exposes the following endpoints:

<br>

## Create a new product

Request: POST '/products'

Takes a body of productDescription and productStock

Example:

    productDescription: {
    name: string
    price: number
    description: string
    tags: string[]
    photo_url?: string
    },
    productStock: {
    quantity: number
    }

Responses:

200: Will return a posted product Response

400: Invalid Price (price was not a number)

400: The request was invalid

<br>

## Update productDescription

Request: POST '/products/:id'

Takes a body of productDescription, selected by the query parameter of the product id u wish to update:

Example:

    productDescription: {
    name: string
    price: number
    description: string
    tags: string[]
    photo_url?: string
    }


Responses: 

200: Will return an updated productDescription

400: Invalid ID

<br>

## Get all products

Request: GET '/products'

Will return all products found in the database

Responses: 

200: Will return all products found

400: TODO

<br>

## Get product by id

Request: GET 'products/:id'

Will return the latest version of productDescription, queried by id

Responses:

200: Will return the queried product, if found

400: Invalid id

<br>

## Delete product by id

Request DELETE '/products/:id'

Will return the deleted products

Responses:

200: Product with 'id' was removed

400: Product with 'id' is already removed

400: Invalid id