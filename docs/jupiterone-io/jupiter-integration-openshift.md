# Openshift

## Overview

JupiterOne provides a managed integration with Openshift. The integration
connects directly to Openshift APIs to obtain cluster metadata and analyze
resource relationships.

## Integration Instance Configuration

To perform a sync, you should use a specific Service Account. To create that in
follow this instruction.

Login as admin:

```bash
oc login -u system:admin
```

Create service account:

```bash
oc create sa jupiterone
oc adm policy add-cluster-role-to-user cluster-reader -z jupiterone
```

Get service account token:

```bash
oc serviceaccounts get-token jupiterone
```

The integration instance configuration requires cluster address and an service
account token.

## Entities

The following entity resources are ingested when the integration runs:

| Openshift Resource | \_type of the Entity   | \_class of the Entity |
| ------------------ | ---------------------- | --------------------- |
| Group              | `openshift_user_group` | `UserGroup`           |
| Project            | `openshift_project`    | `Project`             |
| User               | `openshift_user`       | `User`                |
| Account            | `openshift_account`    | `Account`             |

## Relationships

The following relationships are created/mapped:

| From                | Type         | To                     |
| ------------------- | ------------ | ---------------------- |
| `openshift_account` | **HAS**      | `openshift_project`    |
| `openshift_account` | **HAS**      | `openshift_user_group` |
| `openshift_user`    | **ASSIGNED** | `openshift_user_group` |
