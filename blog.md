#3/4/20
The first thing we decided to do was to define the endpoints for our api. We knew that we needed POST requests for inserting configuration data and sensor reading data. We also therefore needed two GET requests to allow the sensor team to read config data and to allow the client team to retreive sensor data. We began to set all these endpoints up while making some assumptions about how the other teams would send and receive their data. I think we made a very successful initial structure for our server. 

#3/7/20
We spoke online with the other teams to refine the specifications for each endpoint. We specified an expected format for each variable. 

#3/9/20
We met with the other team members and got to see the physical sensor and light. It looked great and we got a chance to update our code to make sure we were all on the same page. We tried to upload our code to Heroku and ran into a number of errors. We worked to resolve them but couldn't quite get there before having to leave for the night. 

#3/11/20
During class, we worked with other team members to move our project forward.  After discussing with our professor, we decided that it would be better for the client and sensor teams to send data as they agreed and let the server do minimal formatting/adjustment of data. This would provide better continuity across the application and reduce unecessary code and processing.

#3/25/20
We finally got the code running on Heroku by fixing dependency bugs and cleaning up unecessary code left over from the template that we used (our Dumb Twitter project). We weren't able to figure out how to pass a Javascript date object in a POST request, so we had to do some formatting on the server, against our resolution in the previous class. We took the sensor timestamp as a string and converted it to a date object before inserting it into MongoDB. This allowed us to run comparisons on dates and return a new endpoint that the client team requested: readings from the last hour, day, and week. We had planned on posting the client app and server to heroku, but our app was crashing, seemingly because of an issue with one of the dependencies from the client app. We decided to run the server on Heroku and keep client and sensor nodes separate. 
