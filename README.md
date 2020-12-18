# login
Boilerplate for login

                            <small><%= data.comments.createdAt.toLocaleDateString() %> - <%= data.comments.createdAt.toLocaleTimeString() %></small>

                                                <div class="comment-section">
                        if(friend.comments > 0) {
                        <% data.forEach(function(comment){ %>

                            <h5><%= data.comments.author.fname %> <%= data.comments.author.lname%></h5>
                            <p><%= data.comments.commentBody %></p>
                            <p><span><i class="far fa-heart"></i></span><%= data.comments.likes %></p>
                        <% }); %>
                    </div>} else {
                        <small>No Comments</small>
                    }