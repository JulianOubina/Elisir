import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  ListItemText,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import CommentActions from './CommentActions';

function CommentCard({ comment, onPublish, onDelete }) {
  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <ListItemText
          primary={comment.user}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ display: 'block', fontWeight: 'bold' }}
              >
                {comment.serviceName}
              </Typography>
              <Rating value={comment.rating} readOnly />
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ display: 'block' }}
              >
                {comment.comment}
              </Typography>
              {comment.secondaryComment}
            </>
          }
        />
      </CardContent>
      <CardActions>
        <CommentActions
          onPublish={() => onPublish(comment.id)}
          onDelete={() => onDelete(comment.id)}
        />
      </CardActions>
    </Card>
  );
}

export default CommentCard;
