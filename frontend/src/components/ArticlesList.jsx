import React, { useState, useEffect } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const ArticleItem = styled.div`
  border: 1px solid #d8d8d8;
  padding: 0px 10px;
  border-radius: 10px;
  margin: 8px 0;
  cursor: pointer;
  color: #555555;
`

const ArticlesList = ({ articles }) => {
  if (articles === null) {
    return (<></>)
  }
  return (
    <div>
      { articles.length > 0 ? articles.map(article => {
        let date = new Date(article.date)
        date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return (
          <Link
            style={{
              display: 'block', margin: '0 auto', textDecoration: 'none',
            }}
            to={`/article/${article._id}`}
            key={article._id}
          >
            <ArticleItem>
              <b>{article.title}</b>
              <br />
              <i>
                { article.author.first_name }
                {' '}
                {article.author.last_name}
                {' '}
                (
                {article.author.username}
                ),
                {' '}
                {date}
              </i>
            </ArticleItem>
          </Link>
        )
      }) : (<i>No articles here yet!</i>)}
    </div>
  )
}

export default ArticlesList
