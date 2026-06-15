const comments = [
  {
    id: 1,
    text: 'Root Comment 1',
    replies: [
      {
        id: 2,
        text: 'Reply 1',
        replies: [
          {
            id: 4,
            text: 'Reply 1.1',
            replies: [
              {
                id: 8,
                text: 'Reply 1.1.1',
                replies: []
              }
            ]
          },
          {
            id: 5,
            text: 'Reply 1.2',
            replies: []
          }
        ]
      },
      {
        id: 3,
        text: 'Reply 2',
        replies: [
          {
            id: 6,
            text: 'Reply 2.1',
            replies: []
          },
          {
            id: 7,
            text: 'Reply 2.2',
            replies: [
              {
                id: 9,
                text: 'Reply 2.2.1',
                replies: []
              },
              {
                id: 10,
                text: 'Reply 2.2.2',
                replies: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 11,
    text: 'Root Comment 2',
    replies: [
      {
        id: 12,
        text: 'Reply 3',
        replies: []
      }
    ]
  }
];

function flattenComments(comments) {
  const result = [];

  function dfs(node, depth) {
    let descendantCount = 0;

    for (const reply of node.replies) {
      descendantCount += dfs(reply, depth + 1);
    }

    result.push({
      id: node.id,
      depth,
      descendantCount
    });

    // Return subtree size including current node
    return descendantCount + 1;
  }

  for (const comment of comments) {
    dfs(comment, 0);
  }

  // Current traversal is post-order, reverse to get desired output
  return result.reverse();
}

console.log(flattenComments(comments));
