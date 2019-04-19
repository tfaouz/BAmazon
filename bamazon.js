var mysql = require("mysql");
var inquirer = ("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "bamazon_db",
    port 3306
})
connection.connect();

var display = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("if you read this, thats good")
    });
    var table = new Table({
        head: ["Product ID", "Product Description", "Cost"],
        colWidths: [12, 50, 8],
        colAligns: ["center", "left", "right"],
    });
    for (var i = 0; i < res.length; i++) {
        table.push([resi].id, res[i].products_name, res[i].price]);
    }
    console.log(table.toString());
    console.log("");
};

var shopping + function () {
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Please select products",


    }).then(function (answer1) {
        var selection = answer1.productsToBuy;
        connection.query("SELECT * FROM products WHERE Id=?", slection, function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("doesnt exist")
            };
            shopping();
            else {
                console.log("everything is good")
                inquirer
                    .prompt({
                        name: "quantity",
                        type: "input",
                        message: "how many would you like?"
                    })
                    .then(function (answer2) {
                        var quantity = answer2.quantity;
                        if (quantity > res[0].stock_quantity) {
                            console.log("sorry we only have" + res[0].stock_quantity + "of product");
                        }
                        shopping();
                    } else {
                            console.log("");
                            console.log(res[0].products_name + " purchased");
                            console.log(quantity + "we have this much" + res[0].price);
                            var newQuantity = res[0].stock_quantity - quantity;
                            connection.query(
                                "update products set stock = " + newQuantity + " WHERE id = " res[0].id,
                                function (err, resUpdate) {
                                    if (err) throw err;
                                    console.log("everything is good it is ordered");
                                    connection.end();
                                }


                            );

                        }

        }
        }
        };
});

};


display();
