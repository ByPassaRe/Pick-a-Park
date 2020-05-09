import React from 'react';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
  } from 'recharts';

function PaymentChartItem() {

    var transactions = [{
        "userId": "739373665737516795936901",
        "amount": 66.83,
        "createdAt": "2020-05-08T18:16:48Z"
      },{
        "userId": "739373665337516795936901",
        "amount": 16.83,
        "createdAt": "2020-05-08T18:16:48Z"
      }, {
        "userId": "926127684743508973185738",
        "amount": 22.25,
        "createdAt": "2020-04-13T05:00:14Z"
      }, {
        "userId": "474512963037879718768921",
        "amount": 84.67,
        "createdAt": "2020-05-02T00:42:45Z"
      }, {
        "userId": "859947157370968500204274",
        "amount": 51.75,
        "createdAt": "2020-04-28T22:59:13Z"
      }, {
        "userId": "845017182134029379747303",
        "amount": 50.6,
        "createdAt": "2020-04-12T10:15:14Z"
      }, {
        "userId": "532334407863130566760226",
        "amount": 3.14,
        "createdAt": "2020-04-14T07:57:58Z"
      }, {
        "userId": "653363375120943834084361",
        "amount": 57.22,
        "createdAt": "2020-05-06T11:50:50Z"
      }, {
        "userId": "143398668672086591493306",
        "amount": 44.56,
        "createdAt": "2020-04-16T09:29:45Z"
      }, {
        "userId": "255588407566580200542103",
        "amount": 82.12,
        "createdAt": "2020-04-12T12:57:42Z"
      }, {
        "userId": "745580398890545187020029",
        "amount": 9.66,
        "createdAt": "2020-04-11T23:11:28Z"
      }, {
        "userId": "317091874128888050891883",
        "amount": 91.34,
        "createdAt": "2020-05-06T01:39:27Z"
      }, {
        "userId": "265930136413095334396854",
        "amount": 19.11,
        "createdAt": "2020-04-16T15:03:53Z"
      }, {
        "userId": "162877816619241410175194",
        "amount": 21.66,
        "createdAt": "2020-04-10T10:47:51Z"
      }, {
        "userId": "178678243691610136986577",
        "amount": 92.35,
        "createdAt": "2020-04-22T02:56:00Z"
      }, {
        "userId": "526234278195768506557193",
        "amount": 74.82,
        "createdAt": "2020-04-07T20:48:36Z"
      }, {
        "userId": "388615634666484598050655",
        "amount": 72.72,
        "createdAt": "2020-05-07T01:27:27Z"
      }, {
        "userId": "407570044254020781864440",
        "amount": 34.66,
        "createdAt": "2020-04-26T11:06:28Z"
      }, {
        "userId": "772909554868499755109578",
        "amount": 83.8,
        "createdAt": "2020-04-22T03:11:18Z"
      }, {
        "userId": "020670334718612928632456",
        "amount": 40.61,
        "createdAt": "2020-04-15T15:18:16Z"
      }, {
        "userId": "506324647929206775372044",
        "amount": 26.23,
        "createdAt": "2020-04-11T01:34:38Z"
      }, {
        "userId": "703236745348390850465637",
        "amount": 64.96,
        "createdAt": "2020-04-23T00:31:29Z"
      }, {
        "userId": "215789391555532477267924",
        "amount": 23.28,
        "createdAt": "2020-05-05T21:54:50Z"
      }, {
        "userId": "123090539808556492410098",
        "amount": 57.81,
        "createdAt": "2020-04-25T01:50:30Z"
      }, {
        "userId": "406069923488919645332752",
        "amount": 79.74,
        "createdAt": "2020-04-16T11:58:32Z"
      }, {
        "userId": "623552383315158966248752",
        "amount": 12.68,
        "createdAt": "2020-05-05T10:56:18Z"
      }, {
        "userId": "401580268098483276238047",
        "amount": 7.59,
        "createdAt": "2020-04-17T22:49:48Z"
      }, {
        "userId": "289254498105537593211768",
        "amount": 18.4,
        "createdAt": "2020-04-13T07:43:23Z"
      }, {
        "userId": "466640399083226100364916",
        "amount": 83.43,
        "createdAt": "2020-05-02T23:22:48Z"
      }, {
        "userId": "952120394755188210892014",
        "amount": 1.58,
        "createdAt": "2020-04-18T17:23:11Z"
      }, {
        "userId": "669397605217410961511098",
        "amount": 17.65,
        "createdAt": "2020-04-27T08:52:46Z"
      }, {
        "userId": "125498473067518911893704",
        "amount": 95.95,
        "createdAt": "2020-05-08T06:11:08Z"
      }, {
        "userId": "197231161050031012578231",
        "amount": 83.48,
        "createdAt": "2020-04-28T19:18:51Z"
      }, {
        "userId": "302700417099320240397581",
        "amount": 98.7,
        "createdAt": "2020-04-10T19:03:26Z"
      }, {
        "userId": "269668063736637144278534",
        "amount": 92.76,
        "createdAt": "2020-05-01T14:37:53Z"
      }, {
        "userId": "396829181950821291891533",
        "amount": 38.02,
        "createdAt": "2020-04-20T09:08:26Z"
      }, {
        "userId": "262286573481755065254652",
        "amount": 61.61,
        "createdAt": "2020-05-06T17:13:51Z"
      }, {
        "userId": "747060847154975352480355",
        "amount": 56.79,
        "createdAt": "2020-04-21T14:09:36Z"
      }, {
        "userId": "034096078109621683852674",
        "amount": 55.83,
        "createdAt": "2020-04-16T02:13:36Z"
      }, {
        "userId": "427727590595055552766035",
        "amount": 96.68,
        "createdAt": "2020-04-26T16:46:19Z"
      }, {
        "userId": "355459506944273171862063",
        "amount": 29.45,
        "createdAt": "2020-05-05T20:13:01Z"
      }, {
        "userId": "258193796676450743972233",
        "amount": 23.14,
        "createdAt": "2020-04-07T01:18:48Z"
      }, {
        "userId": "972452649342597276061977",
        "amount": 68.62,
        "createdAt": "2020-04-19T03:57:51Z"
      }, {
        "userId": "796051171286610133570726",
        "amount": 17.12,
        "createdAt": "2020-04-26T18:58:12Z"
      }, {
        "userId": "942172239441964953883987",
        "amount": 64.21,
        "createdAt": "2020-05-02T16:35:52Z"
      }, {
        "userId": "818418617882288413530339",
        "amount": 5.23,
        "createdAt": "2020-05-07T18:03:17Z"
      }, {
        "userId": "960849835108735942336971",
        "amount": 98.47,
        "createdAt": "2020-04-07T03:06:33Z"
      }, {
        "userId": "796731711993366497538078",
        "amount": 40.45,
        "createdAt": "2020-04-06T20:10:46Z"
      }, {
        "userId": "034952784933485819014830",
        "amount": 16.38,
        "createdAt": "2020-04-20T21:11:35Z"
      }, {
        "userId": "381115849842323761205046",
        "amount": 54.52,
        "createdAt": "2020-04-12T00:28:52Z"
      }, {
        "userId": "452338996464900062396566",
        "amount": 74.9,
        "createdAt": "2020-04-21T23:40:10Z"
      }, {
        "userId": "805920844826134945042207",
        "amount": 72.3,
        "createdAt": "2020-04-29T04:27:47Z"
      }, {
        "userId": "752239397950606482740403",
        "amount": 79.33,
        "createdAt": "2020-04-14T16:08:44Z"
      }, {
        "userId": "015110578853879048112014",
        "amount": 25.4,
        "createdAt": "2020-04-16T00:20:46Z"
      }, {
        "userId": "700071696713082773649714",
        "amount": 45.89,
        "createdAt": "2020-04-22T17:27:59Z"
      }, {
        "userId": "651170238242246202778242",
        "amount": 5.78,
        "createdAt": "2020-05-01T10:46:04Z"
      }, {
        "userId": "236751746468810551646668",
        "amount": 77.79,
        "createdAt": "2020-04-16T20:57:44Z"
      }, {
        "userId": "275256814179518833756680",
        "amount": 30.45,
        "createdAt": "2020-04-12T18:12:35Z"
      }, {
        "userId": "803804737879167684576916",
        "amount": 84.94,
        "createdAt": "2020-04-23T03:38:08Z"
      }, {
        "userId": "957665566879842344380166",
        "amount": 53.45,
        "createdAt": "2020-05-06T20:36:55Z"
      }, {
        "userId": "247900845511551181821923",
        "amount": 23.07,
        "createdAt": "2020-04-11T19:22:11Z"
      }, {
        "userId": "010684676667017015999281",
        "amount": 87.59,
        "createdAt": "2020-04-12T01:53:03Z"
      }, {
        "userId": "792094916588298521086986",
        "amount": 9.8,
        "createdAt": "2020-05-06T12:47:33Z"
      }, {
        "userId": "579908992715924752807614",
        "amount": 2.69,
        "createdAt": "2020-04-22T03:39:05Z"
      }, {
        "userId": "888109625532194730712764",
        "amount": 89.62,
        "createdAt": "2020-04-27T19:56:46Z"
      }, {
        "userId": "739266257360844947006039",
        "amount": 83.89,
        "createdAt": "2020-04-16T20:22:15Z"
      }, {
        "userId": "589904616845699349344957",
        "amount": 64.77,
        "createdAt": "2020-04-14T13:26:16Z"
      }, {
        "userId": "824427130633064688282244",
        "amount": 64.95,
        "createdAt": "2020-04-07T01:23:04Z"
      }, {
        "userId": "663395620806252263067099",
        "amount": 36.0,
        "createdAt": "2020-04-21T12:45:21Z"
      }, {
        "userId": "300330106926225025702134",
        "amount": 45.8,
        "createdAt": "2020-04-13T06:33:26Z"
      }, {
        "userId": "717700575178981878327890",
        "amount": 8.44,
        "createdAt": "2020-04-27T12:11:50Z"
      }, {
        "userId": "701978402139834279715219",
        "amount": 98.22,
        "createdAt": "2020-04-19T13:57:58Z"
      }, {
        "userId": "451391643746131631831002",
        "amount": 92.6,
        "createdAt": "2020-05-03T22:24:31Z"
      }, {
        "userId": "821091326313861950861097",
        "amount": 58.63,
        "createdAt": "2020-05-05T23:23:18Z"
      }, {
        "userId": "283931279587688001271780",
        "amount": 73.31,
        "createdAt": "2020-04-23T20:03:09Z"
      }, {
        "userId": "543380425561213085799289",
        "amount": 37.62,
        "createdAt": "2020-04-23T06:00:13Z"
      }, {
        "userId": "306978815606184816807027",
        "amount": 49.64,
        "createdAt": "2020-05-01T21:47:46Z"
      }, {
        "userId": "811204295727703695214941",
        "amount": 90.32,
        "createdAt": "2020-04-13T00:38:53Z"
      }, {
        "userId": "766624580715243492556226",
        "amount": 49.81,
        "createdAt": "2020-05-05T11:15:17Z"
      }, {
        "userId": "963832214087257461436140",
        "amount": 92.43,
        "createdAt": "2020-04-20T23:23:18Z"
      }, {
        "userId": "185958243026837013561022",
        "amount": 33.76,
        "createdAt": "2020-04-16T06:33:26Z"
      }, {
        "userId": "741358831434908377444809",
        "amount": 80.99,
        "createdAt": "2020-04-21T03:22:13Z"
      }, {
        "userId": "597482603071008807849031",
        "amount": 81.07,
        "createdAt": "2020-04-17T09:13:53Z"
      }, {
        "userId": "856707549143385474846913",
        "amount": 58.51,
        "createdAt": "2020-04-30T18:09:07Z"
      }, {
        "userId": "941884499876185958457333",
        "amount": 87.89,
        "createdAt": "2020-04-17T13:19:09Z"
      }, {
        "userId": "875213779287602767655969",
        "amount": 51.38,
        "createdAt": "2020-04-25T18:15:21Z"
      }, {
        "userId": "101903544207497087019403",
        "amount": 79.53,
        "createdAt": "2020-04-19T21:23:24Z"
      }, {
        "userId": "454397193678234370097394",
        "amount": 15.4,
        "createdAt": "2020-04-11T00:16:10Z"
      }, {
        "userId": "757582554645774037467109",
        "amount": 86.77,
        "createdAt": "2020-05-01T10:14:18Z"
      }, {
        "userId": "567692673272537947697464",
        "amount": 64.51,
        "createdAt": "2020-04-18T01:12:54Z"
      }, {
        "userId": "235922892133892628369032",
        "amount": 85.01,
        "createdAt": "2020-04-06T09:38:03Z"
      }, {
        "userId": "089654758817464988561021",
        "amount": 45.84,
        "createdAt": "2020-04-20T22:26:46Z"
      }, {
        "userId": "381724089247953323173278",
        "amount": 77.32,
        "createdAt": "2020-04-15T20:18:32Z"
      }, {
        "userId": "945320515758022831312332",
        "amount": 87.15,
        "createdAt": "2020-04-23T20:49:46Z"
      }, {
        "userId": "644677288713311864969230",
        "amount": 18.83,
        "createdAt": "2020-04-29T04:05:35Z"
      }, {
        "userId": "492346759094728406297931",
        "amount": 16.76,
        "createdAt": "2020-05-01T09:30:42Z"
      }, {
        "userId": "844915723838798271296149",
        "amount": 59.58,
        "createdAt": "2020-04-06T00:25:17Z"
      }, {
        "userId": "829144614814869488165175",
        "amount": 40.44,
        "createdAt": "2020-04-29T01:46:46Z"
      }, {
        "userId": "001574653797145897556689",
        "amount": 97.63,
        "createdAt": "2020-05-02T06:48:17Z"
      }, {
        "userId": "304671132109475095169260",
        "amount": 42.5,
        "createdAt": "2020-05-04T23:31:23Z"
      }, {
        "userId": "462764873058636408305167",
        "amount": 43.49,
        "createdAt": "2020-04-23T08:00:19Z"
      }]

      
    function prepareData(_transactions){
        return _transactions
            .sort((a,b) => {return new Date(a.createdAt) - new Date(b.createdAt)})
            .map( (obj) => {return { name: obj.createdAt.slice(0, 10) , earning: obj.amount}})
            .reduce(function(res, obj) {
                if (!(obj.name in res))
                    res.__array.push(res[obj.name] = obj);
                else
                    res[obj.name].earning += obj.earning;
                return res;
            }, {__array:[]}).__array
    }

 

    return (
        <ResponsiveContainer aspect={4.0/3.0} width='100%'>
            <BarChart
              data={prepareData(transactions)} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Brush dataKey="name" stroke="#000000" />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ value: 'Earning cash', angle: -90, position: 'insideLeft' }} 
                  tickFormatter={(tickItem) => {return tickItem+"$"}}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="earning" fill="#000000" />
            </BarChart>
        </ResponsiveContainer>
    );

}
export default PaymentChartItem;