export const Cities: string[] = ['Abşeron', 'Xırdalan ş', 'Sumqayıt', 'Gəncə', 'Ağcəbədi', 'Ağdaş', 'Ağstafa', 'Ağsu',
'Astara', 'Balakən', 'Bakı', 'Bərdə', 'Beyləqan', 'Biləsuvar', 'Cəbrayıl', 'Cəlilabad', 'Daşkəsən', 
'Dəliməmmədli', 'Füzuli', 'Gədəbəy', 'Goranboy', 'Göyçay', 'Göygöl', 'Göytəpə', 'Hacıqabul', 
'Horadiz', 'İmişli', 'İsmayıllı', 'Kəlbəcər', 'Kürdəmir', 'Laçın', 'Lənkəran', 'Lerik', 
'Liman', 'Masallı', 'Mingəçevir', 'Naftalan', 'Naxçıvan MR', 'Neftçala', 'Oğuz', 'Qax', 
'Qazax', 'Qəbələ', 'Qobustan', 'Quba', 'Qubadlı', 'Qusar', 'Saatlı', 'Sabirabad', 'Şabran', 
'Şamaxı', 'Samux', 'Şəki', 'Salyan', 'Şəmkir', 'Şirvan', 'Siyəzən', 'Şuşa', 'Tərtər', 
'Tovuz', 'Ucar', 'Xaçmaz', 'Xaçmaz / Xudat', 'Xaçmaz / Nabran', 'Xızı', 'Xocavənd',  
'Yardımlı', 'Yevlax', 'Zaqatala', 'Zəngilan', 'Zərdab', 'Ağdam'];

export const Prices: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 
    27, 28, 29, 30, 35, 40, 45, 50, 55, 60, 65, 70, 
    75, 80, 85, 90, 95, 100
];

export const Timeslots: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', 
    '23:00', '23:30', '00:00', '00:30', '01:00', '01:30', 
    '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', 
    '05:00', '05:30', '06:00', '06:30', '07:00', '07:30'
];

export interface Trip {
    route_id: number,
    user_id?: number,
    from_city: string,
    to_city: string,
    route_date: Date,
    numb_of_pass: string,
    price: string,
    u_id: string,
    note: string,
    car_model: string
}
