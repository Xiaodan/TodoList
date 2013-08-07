This is the README file for CS498 MP1 Spring 2013.  

1) Additional Features that you attempted.  
No, I just tried sorting methods (alphabetically & by deadlines) and some animations.  

2) Code Quality items that you attempted (and needed information like .. which style guide you used).  
I used JQuery Core, Google style guides. And I use this gitHub repo to do version control.  

3) Anything extra that you did and you think should be looked at.  
I drew the background picture myself online.  
And it seems that all the colors I used were regarded as the most pleasant colors for people.  

4) Sources - A list of any sources that you used code or design from and what license that work is under.  
jquery-1.8.2.min.js, jQplugIns.js, jquery-ui-1.8.16.custom.js, date.js, 960 gird system.  
date.js: http://www.datejs.com/   
It's released under MIT license.  

I did not use any website templates for designing and all were created by me (.css).  

The websites below helped me write validating deadline dates functions.  
http://stackoverflow.com/questions/276479/javascript-how-to-validate-dates-in-format-mm-dd-yyyy  
http://www.javascripter.net/faq/convert2.htm#parseInt  

The icons I used were all from the website below. They are in Artistica Icon Set.  
http://dryicons.com/free-icons/preview/artistica-icons-set/  

The fonts I used were all from the website below.  
http://www.myfonts.com/  

5) Anything else that you consider relevant to grading or useful.  
Enjoy grading my TODO-List!  

p.s. Bugs encontered (Soluction).  
1) DELETE-DONE-NOTES button doesn't work on mobile devices. (use onclick())  
2) CLICK-TO-NOTE button doesn't work on SAFARI & mobile devices. (use onclick())  
3) Adding notes with the same content, we delete the original one but the notes_num still increase. (if..else..)  
4）Sorting alphabetically doesn't work on SAFARI & mobile devices. (change method with 1:-1)  
5) Invalid dates or past dates could be added as deadlines. (write checkDate() and isValidDate() functions)  
6) After adding a new note to a long list of notes, it stay at bottom. (use .scrollIntoView() function)  
7) Can't see the full calendar. (increasing margin-bottom)  

