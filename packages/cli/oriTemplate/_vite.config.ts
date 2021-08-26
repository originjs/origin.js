import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<%_ plugins.forEach(function(plugin){ _%>
import <%=plugin%> from '<%=plugin%>'
  <%_ }) _%>
// https://vitejs.dev/config/
export default defineConfig({
  plugins:[vue()<%_ plugins.forEach(function(plugin){ _%>,<%=plugin%>()<%_ }) _%>],
})
