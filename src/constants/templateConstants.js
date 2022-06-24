import azureIcon from '../../src/assets/icons/azure-icon.png';
import springIcon from '../../src/assets/icons/spring.png'
import reactIcon from '../../src/assets/icons/react.png'
import awsIcon from '../../src/assets/icons/aws.png'
import bitbucket from '../../src/assets/icons/bitbucket.png'
import mulesoftIcon from '../../src/assets/icons/mulesoft.png'
import golangIcon from '../../src/assets/icons/golang.png'
import jenkinsIcon from '../../src/assets/icons/jenkins.png'
import rtfIcon from '../../src/assets/icons/rtf.png'
import servicenowicon from '../../src/assets/icons/servicenow.jpg';
import salesforceicon from '../../src/assets/icons/salesforce.png';
import genericdbicon from '../../src/assets/icons/genericdb.png';
import jmetericon from '../../src/assets/icons/jmeter.png';
import anaplan from '../../src/assets/icons/anaplan.png';
import workday from '../../src/assets/icons/workday.png';
import kafka from '../../src/assets/icons/kafka.png';
import magento from '../../src/assets/icons/magento.png';
import lamda from '../../src/assets/icons/lamda.png';
import mongodb from '../../src/assets/icons/mongodb.png';
import mews from '../../src/assets/icons/mews.png';
export const techStack= [
    {
      "name": "spring",
      "description": "Springboot template",
      "selected":false,
      "icon":springIcon
    },
     {
      "name": "react",
      "description": "React template",
       "selected":false,
      "icon":reactIcon
    }, {
      "name": "mule",
      "description": "Mule template",
       "selected":false,
      "icon":mulesoftIcon
    }, {
      "name": "go Lang",
      "description": "Go template",
       "selected":false,
      "icon":golangIcon
    }
  ]
export const cloudStack= [
    {
      "name": "azure",
      "description": "Azure Cloud",
      "selected":false,
      "icon":azureIcon
    },
     {
      "name": "aws",
      "description": "Aws Cloud",
      "icon":awsIcon
    },
    {
      "name": "bitbucket",
      "description": "Bit Bucket",
      "icon":bitbucket
    },
    {
      "name": "jenkins",
      "description": "Jenkins template",
       "selected":false,
      "icon":jenkinsIcon
    }
  ]
export const archetypesStack=[
{
  name: "Mule Placeholder Template",
  value: "apix-mule-placeholder",
  description: "Something about the application",
  icon: rtfIcon
},
{
  name: "Generic Datbase System API",
  value: "apix-generic-db-sapi",
  description: "Something about the application",
  icon: genericdbicon
},
{
  name: "Salesforce System API",
  value: "apix-salesforce-sapi",
  description: "Something about the application",
  icon: salesforceicon
},
{
  name: "Servicenow System APi",
  value: "apix-servicenow-sapi",
  description: "Something about the application",
  icon: servicenowicon
},
{
  name: "Performance Testing Template",
  value: "apix-jmeter-automation-master",
  description: "Something about the application",
  icon: jmetericon
},
{
  name: "Anaplan Template",
  value: "apix-anaplan-sapi",
  description: "Something about the application",
  icon: anaplan
},
{
  name: "Kafka  Template",
  value: "apix-kafka-sapi",
  description: "Something about the application",
  icon: kafka
},
{
  name: "Magento Template",
  value: "apix-magento-sapi",
  description: "Something about the application",
  icon: magento
},{
  name: "Workday Testing Template",
  value: "apix-workday-sapi",
  description: "Something about the application",
  icon: workday
},
{
  name: "Mews Testing Template",
  value: "apix-mews-sapi",
  description: "Something about the application",
  icon: mews
},
{
  name: "Lambda Testing Template",
  value: "apix-lambda-sapi",
  description: "Something about the application",
  icon: lamda
},
{
  name: "Mongodb Testing Template",
  value: "apix-mongodb-sapi",
  description: "Something about the application",
  icon: mongodb
}

]