
        <!--Magazine List-->
        <ul id="MagazineList">
            <?php
                include("core/conn.php");
                $result=mysql_query("SELECT * FROM magazine",$conn);
                while($row=mysql_fetch_array($result))
                {
                    echo "<li class=\"m\" id='MagazineID_".$row["id"]."'>
                    <img src=\"https://www.readerin.com/magazine/".$row["id"]."/o.jpg\" onClick=\"OpenMagazine(this,".$row["id"].",".$row["size"].")\">
                    </li>";
                }
                mysql_close($conn);
            ?>
        </ul>
