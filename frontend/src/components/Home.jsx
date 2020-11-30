import React, { useState, useEffect } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import ArticlesList from './ArticlesList'
import AddArticleModal from './AddArticleModal'

const AddArticleButton = styled.button`
  float: right;
`

const Home = ({ user }) => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    axios.get('/api/article').then(res => {
      setArticles(res.data)
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }, [])

  return (
    <div>
      <h3 style={{ display: 'inline-block' }}>
        Articles
      </h3>
      <AddArticleButton
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#addArticleModal"
      >
        Add Article
      </AddArticleButton>
      <ArticlesList articles={articles} setArticles={setArticles} />
      <AddArticleModal user={user} articles={articles} setArticles={setArticles} />
    </div>
  )
}

export default Home
