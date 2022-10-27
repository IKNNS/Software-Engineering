import React from 'react'

export default function register1() {
  return (
    <div>
    <div>
  <h2>HTML Forms</h2>
  <form action="/action_page.php">
    <label htmlFor="fname">First name:</label><br />
    <input type="text" id="fname" name="fname" defaultValue="John" /><br />
    <label htmlFor="lname">Last name:</label><br />
    <input type="text" id="lname" name="lname" defaultValue="Doe" /><br /><br />
    <input type="submit" defaultValue="Submit" />
  </form> 
  <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>
</div>

    </div>
  )
}