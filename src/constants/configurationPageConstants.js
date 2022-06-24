export const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  });

export const sidemenuList = ['Onboarding', 'Github', 'Azure', 'Jenkins', 'Grafana','Bitbucket','AWS']
export const orgList = [{
    label: 'Organization Name',
    stateVal: 'muleOrganization',
    type: 'text',
}, {

    label: 'Cloud Provider',
    stateVal: 'cloudProvider',
    type: 'text',
}];
export const azureList = [
    {
        label: 'Azure Username',
        stateVal: 'username',
        type: 'text'
    },
    {
        label: 'Azure Client Id',
        stateVal: 'azusername',
        type: 'text'
    },
    {
        label: 'Azure Service Priciple Secret',
        stateVal: 'azpassword',
        type: 'password'
    },
    {
        label: 'Azure Tenant Id',
        stateVal: 'aztenantid',
        type: 'text'
    },
    {
        label: 'Azure Devops PAT',
        stateVal: 'azDevopsPat',
        type: 'password'
    },
    {
        label: 'Devops organization',
        stateVal: 'organization',
        type: 'text'
    }
];
export const githubList = [
    {
        label: 'Git Username',
        stateVal: 'gitUsername',
        type: 'text'
    },
    {
        label: 'Git Repo',
        stateVal: 'gitRepo',
        type: 'text'
    },
    {
        label: 'Git PAT',
        stateVal: 'gitPat',
        type: 'password'
    }
]
export const jenkinsList = [
    {
        label: 'Jenkins Server',
        stateVal: 'jenkinsServer',
        type: 'text'
    },
    {
        label: 'Jenkins Username',
        stateVal: 'jenkinsUsername',
        type: 'text'
    },
    {
        label: 'Jenkins Token',
        stateVal: 'jenkinsToken',
        type: 'password'
    },
];

export const muleEnvList = [
    {
        label: 'Mule ClientId',
        stateVal: 'muleClientId',
        type: 'text'
    },
    {
        label: 'Mule Client Password',
        stateVal: 'muleClientPassword',
        type: 'password'
    },
    {
        label: 'Anypoint Username',
        stateVal: 'anypointUsername',
        type: 'text'
    },
    {
        label: 'Anypoint Password',
        stateVal: 'anypointPassword',
        type: 'password'
    }
];

export const environmentList = [
    {
        label: 'Environment Name',
        stateVal: 'environmentName',
        type: 'text'
    }
]
export const vpcRequestList = [
    {
        label: 'VPC Name',
        stateVal: 'vpcName',
        type: 'text'
    },
    {
        label: 'Region ',
        stateVal: 'muleRegionName',
        type: 'text'
    },
    {
        label: 'CIDR Block ',
        stateVal: 'cidrBlockName',
        type: 'text'
    }
];
export const vpnRequestList = [

    {
        label: 'VPN Name ',
        stateVal: 'vpnName',
        type: 'text'
    },
    {
        label: 'Remote IP Address ',
        stateVal: 'remoteIpAddress',
        type: 'text'
    }
];
export const roleRequestList = [
    {
        label: 'Role Group Name',
        stateVal: 'roleGroupName',
        type: 'text'
    },
    {
        label: 'Description',
        stateVal: 'roleDescription',
        type: 'text'
    },
    {
        label: 'Role ',
        stateVal: 'muleRole',
        type: 'text'
    },
    {
        label: 'Environment ',
        stateVal: 'muleEnvironment',
        type: 'text'
    }
]
export const grafanaList = [
    {
        label: 'Grafana Server',
        stateVal: 'grafanaServer',
        type: 'text'
    },
    {
        label: 'Token',
        stateVal: 'grafanaToken',
        type: 'password'
    }
]
export const regionArr =["us-east-1","us-west-1"];
export const clusterVendorArr =["aks","eks"];

export const rtfRequestList =[
     {
        label: 'RTF Name',
        stateVal: 'rtfName',
        type: 'text'
    },
    {
        label: 'RTF Region',
        stateVal: 'rtfRegion',
        type: 'select',
        options: regionArr
    },
    {
        label: 'RTF Cloud',
        stateVal: 'rtfVendor',
        type: 'select',
        options: clusterVendorArr
    },
    {
        label: 'RTF License Key',
        stateVal: 'rtfLicenseKey',
        type: 'password'
    }
]
 export const bitbucketList =[
     {
        label: 'Bitbucket Username',
        stateVal: 'bitbucketUsername',
        type: 'text'
    },
    {
        label: 'Bit Bucket PAT',
        stateVal: 'bitbucketPat',
        type: 'password'
    },
    {
        label: 'Bitbucket Workspace',
        stateVal: 'bitbucketWorkspace',
        type: 'text'
    },
    {
        label: 'Bit Bucket Project',
        stateVal: 'bitbucketProject',
        type: 'password'
    }
]
 export const awsList =[
     {
        label: 'AWS Access Key',
        stateVal: 'awsaccesskey',
        type: 'text'
    },
    {
        label: 'AWS Acess Key Id',
        stateVal: 'awsaccesskeyid',
        type: 'text',
    },
    {
        label: 'AWS Cluster Name',
        stateVal: 'awscluster',
        type: 'text'
    },
    {
        label: 'AWS Region',
        stateVal: 'awsregion',
        type: 'text'
    }

]
