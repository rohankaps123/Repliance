![repliance](squid_repliance.png)
###A Team Rocket Venture
 
##Meet the Team

#### James Desjardin: Back End Development, Database Development.

I am a Junior at UMass majoring in Computer Science. I have worked with HTML/CSS in the past but am interested in learning more about back-end development in this course. Last semester I took CS 345, and hope to use what I learned about SQL in that course to help with Repliance's database. I have also taken CS 220, which I hope helps me work on determining how Repliance's back-end should be structured.

About me: I currently have two jobs on campus, working at IT User Services and at The Massachusetts Daily Collegian. At IT User Services I am a Lead Consultant and Student Multimedia Assistant, which includes everything from fixing computers, helping students and professors with computer problems in person, shooting video for events and talks on campus as well as video projects for other departments, and sometimes graphic design. At the Daily Collegian, the school's independent student newspaper, I'm the Graphics Production Manager, which means I do lots of design work and oversee the graphics department which is responsible for anything graphic design related that goes in the paper or on our website, mostly working with Photoshop, Illustrator, and InDesign. I also help run UMass Model UN, hosted every spring on campus for high school students from March 13 - 15, of which I designed the website for. I am also doing a secondary major in Communication.

####Colin McGinnis: Back End Development

I'm a Junior at UMASS Amherst majoring in both Computer Science and Journalism. I have worked with a little bit of HTML before and have some basic knowledge of javascript. My main coding experience lies with C and Java. With both Computer Science and Journalism, I hope to end up in some area of the video game industry, whether that be in development or game journalism. Some courses I've taken in the past and am currently taking that will help in developing Repliance are CS 220, CS 187, and CS 311.

####Kalina Nedkova: Back End Development and Database Development
I am a Senior majorning in Physics with a minor in both Computer Science and Math. Next year, I will be a physics graduate student (I am currently deciding between Syracuse and Georgetown) and I hope to be researching soft matter physics through computer simulations. I am most comfortable coding in C, python, and Java, but I look forward to learning more SQL and I am very interested in developing the database because I think this is an extremely useful skill to have. I hope that CS 187 and 230 help me understand some of the concepts behind developing our app.

About me: I was born in Bulgaria, where I lived until the age of 7. When I moved to the US, I became more interested in the sciences than the humanities because I had a hard time reading and writing in English, but could easily solve math problems. I think this is why I ultimately chose to be a physics major. My sophomore year, I decided to get involved in research and I joined the UMass LIGO group, which is a physics research group that aims to detect gravitational waves. Gravitational waves were detected by Einstein but they have never been observed experimentally. After the first few weeks of getting acquainted with the kind of work that the LIGO group did, it became clear to me that computer science is absolutely necessary for any research in physics, which motivated to start working toward my CS minor. My CS courses have significantly helped me with my research, for which I am currently writing a script which produces a trigger every time excess power in the signal of the LIGO detectors is resolved. 

##Problem Statement
####Author: Colin McGinnis 2/22/2015

Often times, we feel our friends aren't being completely truthful when we ask for advice or critiques. For example, when someone asks a friend if what they are wearing looks good, the friend may be more inclined to say yes, no matter how it actually looks. In the classes that our group has taken in the past, such as Anthropology 100 and Psychology 100, it has become clear that some of the most helpful and true advice comes from people who have a neutral view of you, who don't yet know you. Through those two classes, we've found that people are their most truthful when anonymous. 

When you don't have stock in a relationship, and a critique may not be overtly positive, it becomes easier to give that critique. What our startup hopes to do, through the skills from the CS courses we've taken, is create a place where people can get completely unbiased advice on the decisions they are thinking of making. CS 345 has given us knowledge of databases that we'll use in solving the problem and classes like CS 187 and 220 have provided us with the skills to create custom data structures and utilize design strategies that will help make our app more efficient.

##Our Solution - Repliance
####Author: James Desjardin 2/22/2015

The working name we have for our application is Repliance, a question and answer app which draws inspiration from websites and applications such as Quora, Yahoo! Answers, and Snapchat. Repliance will allow a user to post a question and receive anonymous replies, after which the post will be deleted from view for everyone except the user who posted it.

Users who wish to post a question will do so by logging in and creating a new post, including text and optionally including a photo. The post they make is then sent to the inbox or feed of a certain number of other random users, who can choose to reply. Users replying to posts can only see their own replies; in other words, there is no public comment chain to the original post.

One feature of the app is that the amount of users the poster wishes to receive replies from is specified by the poster. For example, if the poster poses a question, they may specify to make the post unavailable to other users "after twenty responses" or some other number dictated by options available to choose from on the web app. This is one of two options for when a post decides to close itself off from public view.

The other option for when a post will vanish is time. A poster may pose a question, and have it set to remove itself from public view after "15 minutes", regardless of the number of replies it has.

As soon as either option completes, the post is hidden from all users except the poster, and the poster can look through the replies they received for as long as they want and see what people had to say.

From the perspective of a user who is not asking a question themselves, they may scroll through questions in a feed and choose which to reply to. The amount of time left a question has before it disappears, and the number of replies needed before closing, will be visible, but what others have replied to it with will not be visible. This allows for the users who originally posted questions to receive answers which they know are not influenced by what others have already said.

Posts will be sorted in the inbox feed by "least time left" and "least replies needed" at the top, so that shorter polls (lasting a few minutes) get replies the fastest, or posts which just need a few more answers to close will be higher priority.

The function of the application for posters and repliers is demonstrated in the following example.

Bob Smith logs in to his Repliance account, because he needs some honest opinions on a new shirt he has purchased. Bob creates a post, where he includes a photo of himself wearing the shirt, and adds the text "Going out tonight, yes/no on the shirt?" as the question. Bob is in a rush, so he chooses for his post to last ten minutes, but does not set a limit on the amount of replies he needs.

Sally Johnson is logged in to Repliance, having fun writing answers to questions, and sees Bob's post pop up in her inbox feed. Sally writes back "No way, that's a shade of yellow only a crossing guard could love." and continues on browsing other questions.

Ten minutes later, Bob checks the replies he's gotten. No one else using Repliance can see his post at this time, but he takes note of Sally's feedback and picks a new outfit. Bob was able to find the advice he needed quickly when he didn't have anyone who he wanted to ask in his regular circle of friends.

The reason Repliance is unique from sites like Quora and Yahoo! Answers is the anonymity and lifespan of posts. Isolating commenters from viewing other comments keeps their replies original and not influenced by what others have written, and the automatic deletion of posts (in the nature of apps such as Snapchat) keeps posters feeling comfortable with asking or posting whatever they wish. Users are also unable to see or follow the names of other user accounts, which provides a layer of anonymity to let people be completely honest in their replies and feel more comfortable in what they ask or post.

##Expected Timeline
####Author: Kalina Nedkova 2/23/2015

2/21/2015 - 2/28/2015  (1 week)
  +  look for similar apps to guarantee Repliance is unique
  +  find useful libraries

2/28/2015 - 3/14/2015  (2 weeks)
  +  Skeleton describing how the code will work
  +  Database setup
  +  User interface

3/14/2015 - 3/28/2015  (2 weeks)
  +  Be able to make a user account
  +  Be able to send photos/text to other users
  +  Front-end

3/28/2015 - 4/11/2015  (2 weeks)
  +  Be able to receive comments on posts
  +  Limit how long a post stays available to other users

4/11/2015 - 4/25/2015 (2 weeks)
  +  Testing and debugging
  +  Complete final version of the app
  +  Final presentation

Additional features if time permits:
  +  Sponsored question



##Project Funding

| Use for funds       | Cost per month  | Cost for 3 months total |
|---------------------|-----------------|-------------------------|
| Purchase of domain  | ~$5             | $15 (yearly purchase)   |
| Dedicated Server    | $130            | $390                    |
| Combined Salaries   | $9600           | $28,800                 |
| Office Space Rental | $2,000          | $6,000                  |
|                     |                 |                         |
| Total (rounded up)  | ~$12,000        | ~$36,000                |