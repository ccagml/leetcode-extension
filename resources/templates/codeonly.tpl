<%=comment.start%>
<%=comment.line%> @lc app=<%=app%> id=<%=fid%> lang=<%=lang%>
<%=comment.line%> @lcpr version=<%=LCPTCTX.version%>
<%=comment.line%>
<%=comment.line%> [<%=fid%>] <%=name%>
<%=comment.end%>

<%=comment.singleLine%> @lc code=start
<%=code%>
<%=comment.singleLine%> @lc code=end

<%=comment.singleLine%> @lcpr-div-debug-arg-start
<%=comment.singleLine%> funName= ""
<%=comment.singleLine%> paramTypes= []
<%=comment.singleLine%> returnType= ""
<%=comment.singleLine%> @lcpr-div-debug-arg-end

<% if(allCaseList && allCaseList.length > 0){ %>
<%=comment.start%><% allCaseList.forEach(function(acase) { %>
<%=comment.singleLine%> @lcpr case=start
<%=comment.singleLine%> <% acase.forEach(function(a_caseitem) { %><%=a_caseitem%>\n<% }) %>
<%=comment.singleLine%> @lcpr case=end
<% }) %>
<%=comment.end%>
<% } %>
