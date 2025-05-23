// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package system.actions;

import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IUser;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.UserAction;

/**
 * Verifies that the specified user name/password combination is valid.
 */
public class VerifyPassword extends UserAction<java.lang.Boolean>
{
	private final java.lang.String userName;
	private final java.lang.String password;

	public VerifyPassword(
		IContext context,
		java.lang.String _userName,
		java.lang.String _password
	)
	{
		super(context);
		this.userName = _userName;
		this.password = _password;
	}

	@java.lang.Override
	public java.lang.Boolean executeAction() throws Exception
	{
		// BEGIN USER CODE
		IUser user = Core.getUser(getContext(), userName);
		return user != null && Core.authenticate(getContext(), user, password);
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 * @return a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "VerifyPassword";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
