---
title: 'Choosing Recurring or Subscription-based Credit Card Payments'
summary: "I've been spending a few evenings researching the best way to integrate subscription-based payments for my new SaaS project. I was curious if there were any new start-ups implementing a web-based appl..."
date: 2010-03-21
---

I've been spending a few evenings researching the best way to integrate subscription-based payments for my new SaaS project. I was curious if there were any new start-ups implementing a web-based applications for recurring or subscription payments, so I posted a [question on Hacker News](https://news.ycombinator.com/item?id=1206993). I got some really good answers and pointers, which I wanted to share. [![](/wp-content/uploads/2010/03/payments2.jpg 'payments')](/wp-content/uploads/2010/03/payments2.jpg)

### Web-based subscription payment services

The biggest contenders in the Web-Apps-for-subscription-payments category are:

- **CheddarGetter** - [https://cheddargetter.com/](https://cheddargetter.com/)
- **Spreedly** \- [https://spreedly.com/](https://spreedly.com/)
- **Chargify** \- [https://chargify.com/](https://chargify.com/)
- **Recurly -** [https://recurly.com/](https://recurly.com/)

I'm not even going to talk through the differences between them, because they basically all offer the same thing with different names and prices. They offer branded payment pages, a nice interface for managing different types of subscriptions, APIs, etc. Damon Cortesi wrote a [much better comparison between the different services](https://www.untitledstartup.com/2010/02/accepting-payments-on-the-real-time-web/), so I recommend that you read that article if you need advice. [![](/wp-content/uploads/2010/03/chargify.jpg 'chargify')](https://chargify.com/)None of them charge too much for their services and the charges are not percentage fees, most of the time, which is good news since the payment gateways are charging a lot there and you really can't afford to let such a big part of your income go to transaction fees. You need to be aware that you will still need a separate payment gateway, and therefore a merchant account, to use those services. I'm really interested in going for Chargify because of the prices and the recommendations on HN. Their website is slick, they've got a video demonstration of the product, their price seems to be less expensive than the other options. Currently they only offer Authorize.net as a payment gateway, but I'm hoping that list of choices will expand with time.

### Merchant Accounts

Another issue that a lot of people want to point out is the issue of how much of a hassle it is to set up merchant accounts. Daniel Tenner wrote an excellent article on merchant accounts, which you should read if you haven't already. [This was posted on HN back when he wrote it](https://news.ycombinator.com/item?id=530055) and there are also some helpful comments there.

### Other services

Currently [Paypal also offers recurring payments](https://www.paypal.com/us/cgi-bin/?cmd=p/xcl/rec/subscr-intro-outside) through their gateway and Google has a similar thing in their [Beta version of Google Checkout](https://code.google.com/apis/checkout/developer/Google_Checkout_Beta_Features.html).
