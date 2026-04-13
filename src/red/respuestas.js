exports.success = function (req, res, mensaje = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    });
}

exports.error = function(req, res, err, status) {
    console.error('[ERROR]', err);

    res.status(status || 500).json({
        error: true,
        status: status || 500,
        message: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage,
        sqlState: err.sqlState,
        errno: err.errno
    });
};

