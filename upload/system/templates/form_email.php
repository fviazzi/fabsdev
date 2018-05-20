<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	</head>
	<body style="max-width:1170px; margin: 0 auto; padding: 0; font-size:14px;">
		<table 	border="0" cellpadding="0" cellspacing="0" width="100%"
				style="
					background:#F5F5F5;
					text-align: 'center';
					font-family: Arial, Helvetica, sans-serif;
				">
			<thead style="
						width:100%;
						background-color:#111111;
						color:#F5F5F5;
						text-align: 'center';
					">
				<tr style="
							width:100%;
							text-align: center;
					">
					<th colspan="2" style="
							padding:60px 0px;
							color:#ED1C24;
							font-weight: 700;
						">
						<h1 style="
								margin:0px auto;
							">
							NUEVA CONSULTA DE FORMULARIO
						</h1>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="
						width:50%;
						padding:50px 20px 10px;
						font-weight: bold;
						text-align: right;
						border-left:1px solid #E3E5EA;
						border-right:2px solid #DDD;
					">
						Nombre
					</td>
					<td style="
						width:50%;
						padding:50px 20px 10px;
						border-right:1px solid #E3E5EA;
					">
						<?php echo $data['name']; ?>
					</td>
				</tr>
				<tr>
					<td style="
						width:50%;
						padding:10px 20px 10px;
						font-weight: bold;
						text-align: right;
						border-radius: 0px 0px 0px 5px;
						border-left:1px solid #E3E5EA;
						border-right:2px solid #DDD;
					">
						Email
					</td>
					<td style="
						width:50%;
						padding:10px 20px 10px;
						border-radius: 0px 0px 5px 0px;
						border-right:1px solid #E3E5EA;
					">
						<a style="
							color:#ED1C24;
							font-weight: bold;
							text-decoration: none;
						" href="mailto:<?php echo $data['email']; ?>"><?php echo $data['email']; ?></a>
					</td>
				</tr>
				<tr>
					<th colspan="2" style="
						width:10%;
						padding:20px 20px 0px;
						font-weight: bold;
						text-align: center;
						border-radius: 0px 0px 0px 5px;
						border-left:1px solid #E3E5EA;
						border-right:1px solid #E3E5EA;
					">
						Consulta:
					</th>
				</tr>
				<tr>
					<th colspan="2" style="
						width:10%;
						padding:20px 40px 50px;
						font-weight: normal;
						text-align: left;
						border-radius: 0px 0px 0px 5px;
						border-left:1px solid #E3E5EA;
						border-right:1px solid #E3E5EA;
						border-bottom:3px solid #E3E5EA;
					">
						<?php echo $data['message']; ?>
					</th>
				</tr>
			</tbody>
		</table>
	</body>
</html>
