import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../Loader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    fontSize: 16,
    padding: "0px 10px 10px 0px",
    paddingRight: "10px !important",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      backgroundColor: "transparent",
    },
  },
}));

const Dashboard = () => {
  const Url = "https://myadmin.rightfx.com/datatable";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [TableData, setTableData] = useState({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [Dashboard, setDashboard] = useState({
    data: [],
  });

  useEffect(() => {
    const param = new FormData();
    param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1);
    param.append("role_id", 1);
    param.append("draw", 0);
    param.append("start", 0);
    param.append("length", 10);
    param.append("order[0][column]", 3);
    param.append("order[0][dir]", "asc");
    axios.post(Url + "/ib_commision_group_list.php", param).then((res) => {
      var newArray = [];
      res.data.script_data.map((item, index) => {
        newArray[index] = { ...item, trueFalse: false };
      });
      TableData.data = newArray;
      setTableData({ ...TableData });
      // console.log(TableData.data);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const param = new FormData();
    param.append("is_app", 1);
    param.append("user_id", 6088);
    param.append("auth_key", "0cd289-dd2b54-a2ea53");
    axios
      .post("https://my.rightfx.com/ajaxfiles/get_all_mt5_balance.php", param)
      .then((res) => {
        console.log(res.data.all_mt5_ac_data);
        Dashboard.data = res.data.all_mt5_ac_data;
        setDashboard({ ...Dashboard });
      });
  }, []);

  const [checked, setChecked] = useState([]);

  var NonCommaSeprate = "";
  for (let i = 0; i < checked.length; i++) {
    NonCommaSeprate += checked[i] + ",";
  }

  // console.log(NonCommaSeprate);
  // console.log(checked);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download Reports
              </Button>
            </Box>
          </Box>

          {/* GRID & CHARTS */}
          {/* <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          > */}
          {/* ROW 1 */}
          {/* <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="32,441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box> */}

          {/* ROW 2 */}
          {/* <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Transactions
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box> */}

          {/* ROW 3 */}
          {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              padding="30px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>
          </Box> */}

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            marginTop="20px"
          >
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              {/* {Dashboard.data.map((item) => {
                return (
                  <Box
                    // display="flex"
                    // justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`6px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                  >
                    <Box
                      display="flex"
                      alignItems="end"
                      justifyContent="space-between"
                    >
                      <Box display="flex" gap="8px" alignItems="center">
                        <Box
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "5px 15px",
                            borderRadius: "5px",
                          }}
                        >
                          Live
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: colors.greenAccent[500],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "5px 15px",
                            borderRadius: "5px",
                          }}
                        >
                          MT5
                        </Box>
                      </Box>
                      <Box>
                        <FormControl sx={{ m: 1 }} variant="standard">
                          <InputLabel id="demo-customized-select-label">
                            <SettingsRoundedIcon />
                          </InputLabel>

                          <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={age}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                            inputProps={{ IconComponent: () => null }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box
                      border="1px solid gray"
                      borderRadius="5px"
                      margin="5px"
                    >
                      <div className="responsive_design">
                        <div className="wisth_lasd">
                          <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                          >
                            Standard :
                          </Typography>
                          <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                          >
                            {item.mt5_acc_no}
                          </Typography>
                        </div>
                        <div className="wisth_lasd">
                          <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                          >
                            Leverage :
                          </Typography>
                          <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                          >
                            {item.leverage}
                          </Typography>
                        </div>

                        <div className="wisth_lasd">
                          <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                          >
                            Credit :
                          </Typography>
                          <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                          >
                            {item.mt_credit}
                          </Typography>
                        </div>
                        <div className="wisth_lasd">
                          <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                          >
                            Margin Free :
                          </Typography>
                          <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                          >
                            {item.mt_free_margin}
                          </Typography>
                        </div>
                      </div>
                      <Box
                        margin="10px"
                        display="flex"
                        flexWrap="wrap"
                        className="jus_center"
                      >
                        <Typography
                          color={colors.grey[100]}
                          variant="h2"
                          fontWeight="600"
                        >
                          {item.mt_balance} USD
                        </Typography>
                        <Box>
                          <Button
                            sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "5px 20px",
                              marginX: "4px",
                            }}
                          >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Deposite
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: colors.greenAccent[500],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "5px 20px",
                              marginX: "4px",
                            }}
                          >
                            Deposite
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })} */}
            </Box>
            {/* <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                <Checkbox
                  onClick={(e, i) => {
                    var newArray = [];
                    TableData.data.map((item, index) => {
                      newArray[index] = {
                        script_id: item.script_id,
                        script_name: item.script_name,
                        trueFalse: e.target.checked,
                      };
                    });
                    TableData.data = newArray;
                    setTableData({ ...TableData });
                  }}
                />{" "}
                Check All
              </Typography>
            </Box>
            {TableData.data.splice(0,10).map((item, i) => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    <Checkbox
                      key={i}
                      checked={item.trueFalse}
                      onChange={(e) => {
                        TableData.data[i].trueFalse = e.target.checked;
                        setTableData({ ...TableData });
                        setChecked([...checked, item.script_id]);
                      }}
                    />
                    {item.script_id}
                  </Typography>
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {item.script_name}
                </Box>
              </Box>
            ))} */}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
