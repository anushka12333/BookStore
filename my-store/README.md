#GET
http://localhost:8082/books

#GET by ID
http://localhost:8082/books/{id}

#POST
http://localhost:8082/saveBooks

#Delete
http://localhost:8082/deletebyId/{id}

#PUT
http://localhost:8082/edit/{id}

#Request
{
    "id":1,
    "title":"Anu",
    "author":"iprag",
    "coverPhotoUrl":"https://www.gettyimages.com/photos/book",
    "isbnNumber":5667,
    "price":45,
    "language":"java"

}


# react url link doubt
How to stop redirecting to the EDIT URL when clicked on "Related List" "edit" link?
#example
{
    "id":1,
    "title":"Anu",
    "author":"iprag",
    "coverPhotoUrl":"https://www.gettyimages.com/photos/book",
    "isbnNumber":5667,
    "price":45,
    "language":"java"

}
#example2
{
        "id": 36223,
        "name": "Shivamanu",
        "email": "shivamanu@1232",
        "password":"$2a$10$8CMHQ5yJwSD67aAxRELzo.uFHrijHsaDgTyAmdH1J87OYiraHcANG",
        "mobile": "34567",
        "role": {
            "id":41211,
            "name":"users"
        }
    }