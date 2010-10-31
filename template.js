<?xml version="1.0" encoding="utf8">
<rss version="2.0">
    <channel>
        <title>Flux RSS de recherches immo</title>
        <description>Blah</description>
        <link>http://www.pap.fr</link>

<% for (var i=0 ; i<items.length ; i++) { %>
  <% var item = items[i];  %>
  <item>
    <title><%= item.titre %></title>
    <link><%= item.url %></link>
    <% if (item.created_on || item.updated_on) { %>
    <pubDate><%= item.updated_on ? item.updated_on : item.created_on %></pubDate>
    <% } %>
    <description>
      <strong><%= item.prix %></strong><br />
      <strong><%= item.surface %></strong><br />
      
      <%= item.description %>
    </description>
  </item>
<% } %>


    </channel>
</rss>
