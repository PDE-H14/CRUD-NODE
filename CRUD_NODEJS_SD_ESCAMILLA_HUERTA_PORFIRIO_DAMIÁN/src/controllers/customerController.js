const controller = {};

controller.start = (req, res) => {

    res.render('customer_signin');

};
controller.si = (req, res) => {

    res.render('customer_signin');

};
controller.li = (req, res) => {

    res.render('customer_login');

};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
            console.log(customer);
            res.redirect('/'); //CAMBIAR UWU
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
         conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
             console.log(customer)
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
         conn.query('UPDATE customer SET ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        //const id = req.params.id;
        const { id } = req.params;
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;