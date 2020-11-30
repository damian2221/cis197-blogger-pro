import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react'

const Content = styled.div`
  padding: 5px;
`
const Author = styled.i`
  margin: 8px 0;
  cursor: pointer;
  color: #555555;
`

const Header = styled.div`
  display: flex;
`

const Article = () => {
  const { articleId } = useParams()
  const history = useHistory()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    axios.get(`/api/article/${articleId}`).then(res => {
      if (res.data._id) {
        setArticle(res.data)
      } else {
        history.push('/')
      }
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }, [articleId])

  if (!article) {
    return (<></>)
  }

  let date = new Date(article.date)
  date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <div>
      <Header>
        <h3 style={{ flex: '1' }}>
          { article.title }
        </h3>
        <Link
          style={{
            textDecoration: 'none',
          }}
          to={`/profile/${article.author.username}`}
        >
          <Author>
            { article.author.first_name }
            {' '}
            {article.author.last_name}
            {' '}
            (
            {article.author.username}
            ),
            {' '}
            {date}
          </Author>
        </Link>
      </Header>
      <Content>
        { article.content }
      </Content>
      <DiscussionEmbed
        shortname="blog-f4mjqjnkkz"
        config={
          {
            identifier: articleId,
            title: article.title,
          }
        }
      />
    </div>
  )
}

export default Article
