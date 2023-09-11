import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../Redux/Action';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = ({ posts, fetchPosts, isLoading, error }) => {
  const navigate = useNavigate()
  const verifyToken = async () => {
    const { data } = await axios.post("http://localhost:4000/token", {}, { withCredentials: true })
    const { status, user } = data;
    if (!status) {
      navigate("/login")
    } else {
      fetchPosts();
    }
  }


  useEffect(() => {
    verifyToken()
  }, [fetchPosts])


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.data,
  isLoading: state.posts.isLoading,
  error: state.posts.error,
});

export default connect(mapStateToProps, { fetchPosts })(Home);
