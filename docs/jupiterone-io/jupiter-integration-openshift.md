# Openshift

## Overview

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
| `openshift_account` | **HAS**      | `undefined`            |
| `openshift_user`    | **ASSIGNED** | `openshift_user_group` |
