import React, { useEffect, useState } from 'react'; // You can theoretically still use 'import React from 'react'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'; // For Travis CI
    
export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function loadPosts() {
            const response = await fetch('/wp-json/wp/v2/posts');
            if(!response.ok) {
                // Travis can't fetch this! 
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);
        }
    
        loadPosts();
   }, [])
  return (
    <Grid container spacing={2}>
      {posts.map((post, index) => (
      <Grid item xs={4} key={index}>
        <Card>
           <CardContent>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                <Typography
                    variant="body2"
                    component="p"
                    dangerouslySetInnerHTML={{__html: post.content.rendered}} />
            </CardContent>
        </Card>
      </Grid>
     ))}
    </Grid>
 );
}
