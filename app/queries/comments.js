const pool = require("../db/connexion");

const getComments = (request, response) => {
    pool.query('SELECT * FROM comments ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    });
};

const getCommentById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM comments WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const getCommentByPostid = (request, response) => {
    const postid = parseInt(request.params.postid);

    pool.query(`SELECT * FROM comments WHERE postid = ${postid}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const createComment = (request, response) => {
    const { postid, name, email, body } = request.body;

    pool.query(`INSERT INTO comments (postid, name, email, body) VALUES ('${postid}', '${name}', '${email}', '${body}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Comments added with ID: ${results.insertID}`);
    })
};

const deleteComment = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM comments WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    })
};

const updateComment = (request, response) => {
    const id = parseInt(request.params.id);
    const { postid, name, email, body } = request.body;

    pool.query(
        'UPDATE comments SET postid = $1, name = $2, email = $3, body = $4 WHERE id = $5',
        [postid, name, email, body, id],
        (error) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Comment modified with ID: ${id}`)
        }
      );
    };

module.exports = {
    getComments,
    getCommentById,
    getCommentByPostid,
    createComment,
    deleteComment,
    updateComment
};