<%=comment.start%>
<%=comment.line%> @lc app=<%=app%> id=<%=fid%> lang=<%=lang%>
<%=comment.line%> @lcpr version=<%=LCPRCTX.version%>
<%=comment.line%>
<%=comment.line%> [<%=fid%>] <%=name%>
<%=comment.line%>
<%=comment.line%> <%=link%>
<%=comment.line%>
<%=comment.line%> <%=category%>
<%=comment.line%> <%=level%> (<%=percent%>%)
<%=comment.line%> Likes:    <%=likes%>
<%=comment.line%> Dislikes: <%=dislikes%>
<%=comment.line%> Total Accepted:    <%=totalAC%>
<%=comment.line%> Total Submissions: <%=totalSubmit%>
<%=comment.line%> Testcase Example:  <%=testcase%>
<%=comment.line%>
<% desc.forEach(function(x) { %><%=comment.line%> <%=x%>
<% }) %><%=comment.end%>

<%=comment.singleLine%> @lc code=start
<%=code%>
<%=comment.singleLine%> @lc code=end

<%=comment.singleLine%> @lcpr-div-debug-arg-start
<%=comment.singleLine%> funName=
<%=comment.singleLine%> paramTypes= []
<%=comment.singleLine%> returnType=
<%=comment.singleLine%> @lcpr-div-debug-arg-end

<% if(allCaseList && allCaseList.length > 0){ %>
<%=comment.start%><% allCaseList.forEach(function(acase) { %>
<%=comment.singleLine%> @lcpr case=start
<%=comment.singleLine%> <% acase.forEach(function(a_caseitem) { %><%=a_caseitem%>\n<% }) %>
<%=comment.singleLine%> @lcpr case=end
<% }) %>
<%=comment.end%>
<% } %>
