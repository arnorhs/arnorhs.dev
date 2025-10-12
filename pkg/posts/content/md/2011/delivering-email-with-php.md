---
title: 'Delivering email with PHP'
summary: "I'm not a very active user on Stack Overflow but I sometimes take 1-2 hours off and try to answer a few questions. I noticed recently how many questions come up on the topic of sending email with web forms, often related to PHP. So I decided to write up a small post on what I would say is the best method to send email using PHP. Just being able to send an email is not a problem at all. It takes a single line of code (often times) and the mail is off. However, getting that email to the recipient's inbox is harder, mostly due to spam-filtering and other spam fighting mechanisms designed to keep spam away. Spam filters are only half the story. Email servers utilize multiple automated techniques to find and detect spam these days."
date: 2011-02-21
---

_TL;DR version: Email delivery is hard, getting through spam filters is hard. Use somebody else's code and sign up for a transactional email service and make them send emails for you._ I'm not a very active user on Stack Overflow but I sometimes take 1-2 hours off and try to answer a few questions. I noticed recently how many questions come up on the topic of sending email with web forms, often related to PHP. So I decided to write up a small post on what I would say is the best method to send email using PHP.

### Delivering email is hard - they'll think you're a spam!

Just being able to send an email is not a problem at all. It takes a single line of code (often times) and the mail is off. However, getting that email to the recipient's inbox is harder, mostly due to spam-filtering and other spam fighting mechanisms designed to keep spam away. Spam filters are only half the story. Email servers utilize multiple automated techniques to find and detect spam these days.

[![Network](https://farm3.static.flickr.com/2436/3780220955_f519f4ca70.jpg)](https://www.flickr.com/photos/15939977@N05/3780220955/ 'Network') [![Creative Commons License](https://arnorhs.dev/wp-content/plugins/photo-dropper/images/cc.png)](https://creativecommons.org/licenses/by-sa/2.0/ 'Attribution-ShareAlike License') credit: [Claus Rebler](https://www.flickr.com/photos/15939977@N05/3780220955/ 'Claus Rebler')

**Most common methods used by servers to keep spam away:**

1.  **First there's the spam filters.** They use all kinds of methods, strictly on the email messages themselves to detect if that email is a proper one. Besides doing assumptions based on statistical analysis of the word usage in the email, they also check for various headers and the general "fingerprint" of the email.
2.  **Server black-lists.** A lot of mail servers have a subscription to databases that list [IPs](https://en.wikipedia.org/wiki/IP_address) of servers that have been know to send out spam. If your server gets listed in one of those databases, you'll have to ask for a delisting and that can become pretty hard.
3.  **Challenge-response.** This method revolves around asking the sender to pass various tests to prove his authenticity. The most common one being checking to see if the sending email address exists, but this gets more complicated. More info on [challenge-response systems](https://en.wikipedia.org/wiki/Challenge-response_spam_filtering).
4.  **Reverse DNS checking.** This involves doing a reverse DNS lookup for certain things, mostly to disallow email sent from dial-up users and other homes, but there is more to it.

This is by no means a comprehensive list. There are many many many more issues to think of when you want to do email right and the [Wikipedia entry about anti-spam techniques](https://en.wikipedia.org/wiki/Anti-spam_techniques#Automated_techniques_for_e-mail_administrators) servers use has a very good list of all there is to think about.

### The difficulty level

Now, given the difficulty level and the techniques we're up against, you should really know what you're doing if you want to do this yourself. _"But I'm not sending spam, my email is legitimate."_ That may be true, but the spammers out there have gone to such lengths to make their emails seem real (from a technical perspective) that you're up against a tough competition if you want your emails to get through. You might even realize that your emails are being delivered, say, 90% of the time, even 95%. Those are still a lot of inboxes that are not getting your emails. On top of that you'll have server configuration options, queue problems, getting delisted, etc.

### Doing it yourself with the mail() function

PHP provides a built-in generic email function called [mail()](https://is.php.net/manual/en/function.mail.php). It accepts 3 required parameters (to, subject and message) and two optional ones (headers and additional parameters). Here's an example: \[gist id="836042" file="example1.php"\] Note: A lot of people don't like my indentation style, but I think it's more readable like this, rather than having multiple parameters in a single long line. If you want to do it with a proper "from" address and a reply to, you can do the following: \[gist id="836042" file="example2.php"\] Now, both of these example are plain horrible. You will hardly get any email delivered that way. There are things missing in the headers and your email will look like regular spam to the spam filtering software.

### Send email using _PHP Mailer_ or _Swift mailer_

What I always recommend to people when they ask me about this, is to use class/libarary called [PHP mailer](https://phpmailer.worxware.com/) or Swift mailer. They're used for the sole purpose of sending out emails and they get the job done better than you (or I) would ever using the mail() function ourselves. For the sake of this guide, I'll be using PHP mailer, since it's better known. You can also use PHP Mailer to connect to [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) servers easily, which will save you a lot of code. An SMTP server is a server running a piece of software that sends and receives emails for multiple users. Here's an example how you would connect to an SMTP server and send a similar email as before with PHP Mailer: \[gist id="836042" file="example3.php"\] It also allows you to add attachments pretty easily. Here's an example (working with our previous object) \[gist id="836042" file="example4.php"\] I tried to comment the code extensively, so it should explain itself for the most part.

### Using an email deliverability service or high quality SMTP

Creating the email itself is only half the story. You also need to get it out there and you need an SMTP server. Most hosting providers provide some sort of SMTP server, but you usually don't have full access to them. If you're using some VM hosting, that will probably also have restrictions in the EULA or the terms around how many emails you can send out, etc. (And if you think you don't need an SMTP server, you're wrong. It may be that the web server running your website is sending the emails, but just know that then the web server itself is running an SMTP server.) The really easy way out of this is to use an email deliverability service. Sometimes they're called transactional email services. There are a few out there, the ones I know about are:

- SendGrid - Great support, great dedication to delivery and they also have an API. [www.sendgrid.com](https://www.sendgrid.com)
- PostmarkApp - [www.postmarkapp.com](https://www.postmarkapp.com)
- PostageApp - This is a relatively new service, so I don't know much about them, but they seem to have fair prices - [www.postageapp.com](https://www.postageapp.com)

They all have their price point, feature set, etc. I'm very fond of sendgrid.com. They are really doing things right in the marketing side and have grown a lot in a short time. They also offer a free plan if you only send a small amount of emails (200 email per day), which will cover the needs of most websites. Sign up here for sendgrid: [https://sendgrid.com/pricing.html](https://sendgrid.com/pricing.html) (note: at the bottom there's a link to the "free" account). If you want to sign up and you \*also\* want to support an independent blogger (that's me), you can use this link to sign up: [https://sendgrid.tellapal.com/a/clk/v1cMc](https://sendgrid.tellapal.com/a/clk/v1cMc) Here's how you plug sendgrid's SMTP servers into our PHP mailer configuration. Note: You'll need to have signed up for an account for it to work: \[gist id="836042" file="example5.php"\] So what's changed in our example? Almost nothing. Just the login information. It's that simple. SendGrid and most of the other transactional email services offer a very powerful API. SendGrid's API can be used both for sending out the emails, checking for blocked addresses, receiving notifications and more. I don't know the other services' APIs but I expect similar functionality.

### Conclusion

No fighting the email servers, tweaking MTA config files, no fighting the queue, no spam list delistings, etc. It's a luxury when you don't have to fight your server all the time. As you may hear, I have had my share of those fights in my day and I'm relieved that I'll never have to do that again :) So, what used to amount to a fair share of work, can now be done by a plugin in a library and plugging in a specialized web service. Less code is better code.

- All the examples are up on this gist, if you're interested: [https://gist.github.com/836042](https://gist.github.com/836042)
- Link to SendGrid's documentation: [https://sendgrid.com/documentation/map](https://sendgrid.com/documentation/map)
- Swift mailer: [https://swiftmailer.org/](https://swiftmailer.org/)
- PHP Mailer: [https://phpmailer.worxware.com/](https://phpmailer.worxware.com/)

If you're interested in more code examples, tips or tricks around emails, etc, let me know in the comments.
