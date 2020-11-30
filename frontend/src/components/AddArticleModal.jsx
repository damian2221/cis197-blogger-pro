import React, { useState } from 'react'
import axios from 'axios'

const AddArticleModal = ({ user, articles, setArticles }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitArticle = () => {
    axios.post('/api/article/add', { title, content }).then(res => {
      res.data.author = user
      setArticles([res.data, ...articles])
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }

  return (
    <div
      className="modal fade"
      id="addArticleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addArticleModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="modal-title" id="addArticleModalTitle">Add Article:</h5>
            Title:
            <input
              className="form-control"
              style={{ margin: '15px 0' }}
              onChange={e => {
                setTitle(e.target.value)
              }}
            />
            Content:
            <textarea
              className="form-control"
              rows="10"
              style={{ margin: '15px 0' }}
              onChange={e => {
                setContent(e.target.value)
              }}
            />
            <button
              type="button"
              className="btn btn-info btn-block"
              data-dismiss="modal"
              onClick={e => {
                e.preventDefault()
                submitArticle()
              }}
            >
              Add article
            </button>
            <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticleModal
