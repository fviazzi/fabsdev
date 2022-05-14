<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	</head>
	<body style="max-width:1170px; margin: 0 auto; padding: 0; font-size:14px;">
		<table 	border="0" cellpadding="0" cellspacing="0" width="100%"
				style="
					max-width: 500px;
					margin: 0 auto;
					background:#FFF;
					text-align: 'center';
					font-family: Arial, Helvetica, sans-serif;
				">
			<thead style="
						width:100%;
						background-color:#003E36;
						text-align: center;
					">
				<tr style="
							width:50%;
							text-align: center;
					">
					<th colspan="2" style="
							padding: 0px;
							color:#F5F5F5;
							font-weight: 700;
						">
						<img src="https://fabsdev.com/img/mailing/form-header.png" alt="">
					</th>
				</tr>
				<tr style="
							width:100%;
							text-align: center;
					">
					<th colspan="2" style="
							padding: 20px 0px;
							color: #F5F5F5;
							font-size: 12px;
						">
						<h1 style="
								margin:0px auto;
								font-weight: 300;
							">
							Nueva Consulta de Formulario
						</h1>
					</th>
				</tr>
			</thead>
			<tbody >
				<tr>
					<td>
						<table border="0" cellpadding="0" cellspacing="0" width="100%"
								style="
									margin: 30px auto 20px;
									padding: 20px;
									background:#DCF3EF;
									text-align: 'center';
									font-family: Arial, Helvetica, sans-serif;
									border-top: 5px solid #00695C;
								">
							<tbody>
								<tr>
									<td style="
										width:100%;
										padding:20px 10px;
										text-align: left;
									">
										<b>Nombre:</b> <?php echo $data['name']; ?>
									</td>
								</tr>
								<tr>
									<td style="
										width:100%;
										padding:20px 10px;
										text-align: left;
									">
										<b>Email</b>
										<a style="
											color:#00695C;
											font-weight: bold;
											text-decoration: none;
										" href="mailto:<?php echo $data['email']; ?>"><?php echo $data['email']; ?></a>
									</td>
								</tr>
								<tr>
									<td style="
										width:100%;
										padding:20px 10px 10px;
										text-align: left;
									">
										<b>Consulta:</b>
									</td>
								</tr>
								<tr>
									<td style="
										width:100%;
										padding:0 10px 20px;
										font-weight: 300;
										text-align: left;
									">
										<?php echo $data['message']; ?>
									</td>
								</tr>
							</tbody>
					</td>
				</tr>
			</tbody>
		</table>
	</body>
</html>
