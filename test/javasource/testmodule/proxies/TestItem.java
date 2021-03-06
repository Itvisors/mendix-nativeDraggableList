// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package testmodule.proxies;

public class TestItem
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject testItemMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "TestModule.TestItem";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Name("Name"),
		ItemID("ItemID"),
		SeqNbr("SeqNbr"),
		TestCheckbox("TestCheckbox");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public TestItem(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "TestModule.TestItem"));
	}

	protected TestItem(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject testItemMendixObject)
	{
		if (testItemMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("TestModule.TestItem", testItemMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a TestModule.TestItem");

		this.testItemMendixObject = testItemMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'TestItem.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static testmodule.proxies.TestItem initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return testmodule.proxies.TestItem.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static testmodule.proxies.TestItem initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new testmodule.proxies.TestItem(context, mendixObject);
	}

	public static testmodule.proxies.TestItem load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return testmodule.proxies.TestItem.initialize(context, mendixObject);
	}

	public static java.util.List<testmodule.proxies.TestItem> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<testmodule.proxies.TestItem> result = new java.util.ArrayList<testmodule.proxies.TestItem>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//TestModule.TestItem" + xpathConstraint))
			result.add(testmodule.proxies.TestItem.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(com.mendix.systemwideinterfaces.core.IContext context)
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of Name
	 */
	public final java.lang.String getName()
	{
		return getName(getContext());
	}

	/**
	 * @param context
	 * @return value of Name
	 */
	public final java.lang.String getName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Name.toString());
	}

	/**
	 * Set value of Name
	 * @param name
	 */
	public final void setName(java.lang.String name)
	{
		setName(getContext(), name);
	}

	/**
	 * Set value of Name
	 * @param context
	 * @param name
	 */
	public final void setName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String name)
	{
		getMendixObject().setValue(context, MemberNames.Name.toString(), name);
	}

	/**
	 * @return value of ItemID
	 */
	public final java.lang.String getItemID()
	{
		return getItemID(getContext());
	}

	/**
	 * @param context
	 * @return value of ItemID
	 */
	public final java.lang.String getItemID(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.ItemID.toString());
	}

	/**
	 * Set value of ItemID
	 * @param itemid
	 */
	public final void setItemID(java.lang.String itemid)
	{
		setItemID(getContext(), itemid);
	}

	/**
	 * Set value of ItemID
	 * @param context
	 * @param itemid
	 */
	public final void setItemID(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String itemid)
	{
		getMendixObject().setValue(context, MemberNames.ItemID.toString(), itemid);
	}

	/**
	 * @return value of SeqNbr
	 */
	public final java.lang.Integer getSeqNbr()
	{
		return getSeqNbr(getContext());
	}

	/**
	 * @param context
	 * @return value of SeqNbr
	 */
	public final java.lang.Integer getSeqNbr(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.SeqNbr.toString());
	}

	/**
	 * Set value of SeqNbr
	 * @param seqnbr
	 */
	public final void setSeqNbr(java.lang.Integer seqnbr)
	{
		setSeqNbr(getContext(), seqnbr);
	}

	/**
	 * Set value of SeqNbr
	 * @param context
	 * @param seqnbr
	 */
	public final void setSeqNbr(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer seqnbr)
	{
		getMendixObject().setValue(context, MemberNames.SeqNbr.toString(), seqnbr);
	}

	/**
	 * @return value of TestCheckbox
	 */
	public final java.lang.Boolean getTestCheckbox()
	{
		return getTestCheckbox(getContext());
	}

	/**
	 * @param context
	 * @return value of TestCheckbox
	 */
	public final java.lang.Boolean getTestCheckbox(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.TestCheckbox.toString());
	}

	/**
	 * Set value of TestCheckbox
	 * @param testcheckbox
	 */
	public final void setTestCheckbox(java.lang.Boolean testcheckbox)
	{
		setTestCheckbox(getContext(), testcheckbox);
	}

	/**
	 * Set value of TestCheckbox
	 * @param context
	 * @param testcheckbox
	 */
	public final void setTestCheckbox(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean testcheckbox)
	{
		getMendixObject().setValue(context, MemberNames.TestCheckbox.toString(), testcheckbox);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return testItemMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final testmodule.proxies.TestItem that = (testmodule.proxies.TestItem) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "TestModule.TestItem";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
