Use Node.js, MongoDB and Express to design a payments API that has the following endpoints: 

- Add payment: Allow the user to add a payment 
- Add recurring payment: Allow the user to add a recurring payment 
		- Should include the following fields 
			- active 
			- user_id 
			- frequency 

		- The frequency field can be any of the following 
			- daily 
			- weekly 
			- bi_weekly (every other week) 
			- semi_monthly (twice a month) 
			- monthly 
- Process recurring payments: Process active recurring payments by creating all eligible payments for the next 30 days. 
- Cancel recurring payment: Set the active flag of the recurring payment and any associated payments to false. 
- Update recurring payment frequency: Updates the frequency of the recurring payment. Make sure to make any needed adjustments to future payments that followed the previous frequency pattern. 

You may use any online tools at your disposal (Stack Overflow, Express/Mongoose/Node.js documentation, etc.) in addition to discussing your approach with the interviewer. 